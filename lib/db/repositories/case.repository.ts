/**
 * Case Repository
 * Handles all case-related database operations
 */

import { eq, and, desc } from 'drizzle-orm';
import { BaseRepository } from './base.repository';
import { 
  cases, 
  caseParticipants,
  buildings,
  workflowSteps,
  type Case, 
  type NewCase,
  type Building,
  type NewBuilding,
} from '../schema';

export class CaseRepository extends BaseRepository {
  /**
   * Create a new case with building
   */
  async createWithBuilding(
    buildingData: NewBuilding,
    caseData: Omit<NewCase, 'buildingId'>
  ): Promise<{ case: Case; building: Building }> {
    try {
      this.log('Creating case with building', { buildingData, caseData });
      
      // Use transaction to ensure consistency
      const result = await this.db.transaction(async (tx) => {
        // Create building
        const [building] = await tx
          .insert(buildings)
          .values(buildingData)
          .returning();
        
        // Generate case number
        const caseNumber = await this.generateCaseNumber(caseData.caseType);
        
        // Create case
        const [newCase] = await tx
          .insert(cases)
          .values({
            ...caseData,
            buildingId: building.id,
            caseNumber,
          })
          .returning();
        
        // Add lead as participant
        await tx.insert(caseParticipants).values({
          caseId: newCase.id,
          userId: caseData.leadUserId,
          isLead: true,
          hasConsented: true,
          consentedAt: new Date(),
          role: 'lead',
        });
        
        // Create initial workflow steps based on case type
        await this.createWorkflowSteps(tx, newCase.id, caseData.caseType);
        
        return { case: newCase, building };
      });
      
      return result;
    } catch (error) {
      this.handleError(error, 'CaseRepository.createWithBuilding');
    }
  }

  /**
   * Generate unique case number
   */
  private async generateCaseNumber(caseType: string): Promise<string> {
    const prefix = caseType.toUpperCase().replace('_', '-');
    const year = new Date().getFullYear();
    
    // Get the latest case number for this type and year
    const latestCase = await this.db.query.cases.findFirst({
      where: eq(cases.caseType, caseType as any),
      orderBy: desc(cases.createdAt),
    });
    
    let sequence = 1;
    if (latestCase?.caseNumber) {
      const match = latestCase.caseNumber.match(/(\d+)$/);
      if (match) {
        sequence = parseInt(match[1]) + 1;
      }
    }
    
    return `${prefix}-${year}-${sequence.toString().padStart(3, '0')}`;
  }

  /**
   * Create workflow steps for a case
   */
  private async createWorkflowSteps(tx: any, caseId: string, caseType: string) {
    const steps = this.getWorkflowStepsForType(caseType);
    
    await tx.insert(workflowSteps).values(
      steps.map((step, index) => ({
        caseId,
        stepName: step,
        stepOrder: index + 1,
        status: 'pending',
      }))
    );
  }

  /**
   * Get workflow steps based on case type
   */
  private getWorkflowStepsForType(caseType: string): string[] {
    const workflows: Record<string, string[]> = {
      rtm: [
        'Eligibility Check',
        'Building Registration',
        'Gather Support',
        'Form RTM Company',
        'Serve Notice of Invitation',
        'Serve Notice of Claim',
        'Counter-notice Period',
        'Acquire Management',
      ],
      enfranchisement: [
        'Eligibility Check',
        'Building Registration',
        'Gather Support',
        'Property Valuation',
        'Form Nominee Company',
        'Serve Initial Notice',
        'Counter-notice Period',
        'Negotiation',
        'Complete Purchase',
      ],
      rmc_takeover: [
        'Current RMC Analysis',
        'Member Recruitment',
        'Documentation Review',
        'AGM Preparation',
        'Vote and Takeover',
      ],
    };
    
    return workflows[caseType] || [];
  }

  /**
   * Find case by ID with relations
   */
  async findById(id: string): Promise<Case | null> {
    try {
      const result = await this.db.query.cases.findFirst({
        where: eq(cases.id, id),
        with: {
          building: true,
          leadUser: true,
          participants: {
            with: {
              user: true,
              property: true,
            },
          },
          workflowSteps: {
            orderBy: (steps, { asc }) => [asc(steps.stepOrder)],
          },
        },
      });
      
      return result || null;
    } catch (error) {
      this.handleError(error, 'CaseRepository.findById');
    }
  }

  /**
   * Find cases by user
   */
  async findByUser(userId: string): Promise<Case[]> {
    try {
      const participantCases = await this.db.query.caseParticipants.findMany({
        where: eq(caseParticipants.userId, userId),
        with: {
          case: {
            with: {
              building: true,
              workflowSteps: true,
            },
          },
        },
      });
      
      return participantCases.map(p => p.case);
    } catch (error) {
      this.handleError(error, 'CaseRepository.findByUser');
    }
  }

  /**
   * Update case status
   */
  async updateStatus(id: string, status: Case['status']): Promise<Case> {
    try {
      const [updatedCase] = await this.db
        .update(cases)
        .set({
          status,
          updatedAt: new Date(),
          ...(status === 'completed' ? { completedAt: new Date() } : {}),
        })
        .where(eq(cases.id, id))
        .returning();
      
      if (!updatedCase) {
        throw new Error('Case not found');
      }
      
      return updatedCase;
    } catch (error) {
      this.handleError(error, 'CaseRepository.updateStatus');
    }
  }

  /**
   * Add participant to case
   */
  async addParticipant(
    caseId: string,
    userId: string,
    propertyId?: string,
    role: string = 'participant'
  ): Promise<void> {
    try {
      await this.db.insert(caseParticipants).values({
        caseId,
        userId,
        propertyId,
        role,
        isLead: role === 'lead',
      });
    } catch (error) {
      this.handleError(error, 'CaseRepository.addParticipant');
    }
  }

  /**
   * Update workflow step
   */
  async updateWorkflowStep(
    caseId: string,
    stepName: string,
    status: string,
    completedBy?: string
  ): Promise<void> {
    try {
      await this.db
        .update(workflowSteps)
        .set({
          status,
          ...(status === 'in_progress' ? { startedAt: new Date() } : {}),
          ...(status === 'completed' ? { 
            completedAt: new Date(),
            completedBy,
          } : {}),
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(workflowSteps.caseId, caseId),
            eq(workflowSteps.stepName, stepName)
          )
        );
    } catch (error) {
      this.handleError(error, 'CaseRepository.updateWorkflowStep');
    }
  }
}

// Export singleton instance
export const caseRepository = new CaseRepository();
