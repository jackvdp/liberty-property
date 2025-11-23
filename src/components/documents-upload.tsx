"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { IconUpload, IconFile, IconX, IconCheck, IconAlertCircle } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { DOCUMENT_CATEGORIES, type DocumentCategory } from "@/config/document-types"

interface UploadedFile {
  file: File
  id: string
  status: "pending" | "uploading" | "success" | "error"
  error?: string
}

interface DocumentsUploadProps {
  userId: string
}

export function DocumentsUpload({ userId }: DocumentsUploadProps) {
  const [uploads, setUploads] = useState<Record<string, UploadedFile[]>>({})

  const handleFileSelect = (category: DocumentCategory, typeId: string, files: FileList | null) => {
    if (!files || files.length === 0) return

    const documentType = DOCUMENT_CATEGORIES[category].types.find(t => t.id === typeId)
    const allowMultiple = documentType?.allowMultiple ?? false

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      id: `${typeId}-${Date.now()}-${Math.random()}`,
      status: "pending" as const,
    }))

    setUploads(prev => {
      const key = `${category}-${typeId}`
      const existing = prev[key] || []
      
      // If multiple files not allowed, replace existing
      if (!allowMultiple && newFiles.length > 0) {
        return { ...prev, [key]: [newFiles[0]] }
      }
      
      return { ...prev, [key]: [...existing, ...newFiles] }
    })
  }

  const removeFile = (category: DocumentCategory, typeId: string, fileId: string) => {
    setUploads(prev => {
      const key = `${category}-${typeId}`
      const existing = prev[key] || []
      return { ...prev, [key]: existing.filter(f => f.id !== fileId) }
    })
  }

  const getFilesForType = (category: DocumentCategory, typeId: string): UploadedFile[] => {
    const key = `${category}-${typeId}`
    return uploads[key] || []
  }

  const handleUpload = async (category: DocumentCategory, typeId: string) => {
    const files = getFilesForType(category, typeId)
    if (files.length === 0) return

    const key = `${category}-${typeId}`
    
    // Set all to uploading
    setUploads(prev => ({
      ...prev,
      [key]: prev[key].map(f => ({ ...f, status: "uploading" as const }))
    }))

    // Upload each file
    for (const uploadFile of files) {
      try {
        const { uploadDocument } = await import('@/lib/actions/document-upload.actions')
        
        // Convert File to FormData for server action
        const formData = new FormData()
        formData.append('file', uploadFile.file)
        formData.append('category', category)
        formData.append('documentType', typeId)
        
        const result = await uploadDocument(formData)

        if (result.success) {
          // Mark this file as success
          setUploads(prev => ({
            ...prev,
            [key]: prev[key].map(f => 
              f.id === uploadFile.id 
                ? { ...f, status: "success" as const }
                : f
            )
          }))
          console.log(`✅ Uploaded: ${result.filePath}`)
        } else {
          // Mark this file as error
          setUploads(prev => ({
            ...prev,
            [key]: prev[key].map(f => 
              f.id === uploadFile.id 
                ? { ...f, status: "error" as const, error: result.error }
                : f
            )
          }))
          console.error(`❌ Upload failed: ${result.error}`)
        }
      } catch (error) {
        // Mark this file as error
        setUploads(prev => ({
          ...prev,
          [key]: prev[key].map(f => 
            f.id === uploadFile.id 
              ? { ...f, status: "error" as const, error: error instanceof Error ? error.message : 'Unknown error' }
              : f
          )
        }))
        console.error('❌ Upload error:', error)
      }
    }
  }

  return (
    <div className="space-y-8">
      {(Object.entries(DOCUMENT_CATEGORIES) as [DocumentCategory, typeof DOCUMENT_CATEGORIES[DocumentCategory]][]).map(
        ([categoryKey, category]) => (
          <Card key={categoryKey}>
            <CardHeader>
              <CardTitle>{category.label}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {category.types.map((docType) => {
                const files = getFilesForType(categoryKey, docType.id)
                const hasFiles = files.length > 0
                const allSuccess = hasFiles && files.every(f => f.status === "success")

                return (
                  <div key={docType.id} className="space-y-3">
                    {/* Document Type Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-sm">
                            {docType.label}
                            {docType.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </h4>
                          {allSuccess && (
                            <div className="flex items-center gap-1 text-xs text-green-600">
                              <IconCheck className="w-3 h-3" />
                              Uploaded
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {docType.description}
                          {docType.allowMultiple && " (Multiple files allowed)"}
                        </p>
                      </div>
                    </div>

                    {/* File Upload Area */}
                    <div className="space-y-2">
                      {/* Uploaded Files Display */}
                      {files.map((uploadedFile) => (
                        <div
                          key={uploadedFile.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            uploadedFile.status === "success" && "bg-green-50 border-green-200",
                            uploadedFile.status === "error" && "bg-red-50 border-red-200",
                            uploadedFile.status === "pending" && "bg-muted/50",
                            uploadedFile.status === "uploading" && "bg-blue-50 border-blue-200"
                          )}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <IconFile className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {uploadedFile.file.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              {uploadedFile.status === "error" && uploadedFile.error && (
                                <p className="text-xs text-red-600 mt-1">
                                  {uploadedFile.error}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            {uploadedFile.status === "success" && (
                              <IconCheck className="w-4 h-4 text-green-600" />
                            )}
                            {uploadedFile.status === "error" && (
                              <IconAlertCircle className="w-4 h-4 text-red-600" />
                            )}
                            {uploadedFile.status === "uploading" && (
                              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                            )}
                            {uploadedFile.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={() => removeFile(categoryKey, docType.id, uploadedFile.id)}
                              >
                                <IconX className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Upload Button/Area */}
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor={`file-${categoryKey}-${docType.id}`}
                          className={cn(
                            "flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
                            "hover:border-liberty-primary hover:bg-liberty-primary/5",
                            "text-sm text-muted-foreground hover:text-liberty-primary"
                          )}
                        >
                          <IconUpload className="w-4 h-4" />
                          <span>
                            {hasFiles 
                              ? docType.allowMultiple 
                                ? "Add more files" 
                                : "Replace file"
                              : "Choose file"}
                          </span>
                        </label>
                        <input
                          id={`file-${categoryKey}-${docType.id}`}
                          type="file"
                          className="hidden"
                          multiple={docType.allowMultiple}
                          onChange={(e) => handleFileSelect(categoryKey, docType.id, e.target.files)}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        />

                        {hasFiles && files.some(f => f.status === "pending") && (
                          <Button
                            onClick={() => handleUpload(categoryKey, docType.id)}
                            className="whitespace-nowrap"
                          >
                            <IconUpload className="w-4 h-4 mr-2" />
                            Upload
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      )}

      {/* Help Text */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <IconAlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-blue-900">
                Accepted file formats
              </p>
              <p className="text-sm text-blue-800">
                PDF, Word documents (.doc, .docx), and images (.jpg, .jpeg, .png) up to 10MB each
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
