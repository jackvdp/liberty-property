import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SiteHeader({ title = "Dashboard" }: { title?: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b border-liberty-primary/10 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="font-reckless text-xl font-semibold">{title}</h1>
      </div>
    </header>
  )
}
