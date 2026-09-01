export interface Company {
  id: string;
  legalName: string;
  registrationNumber: string;
  gstin: string;
  pan: string;
  udyamNumber: string;
  category: string;
  address: string;
  verificationStatus: {
    registration: boolean;
    gst: boolean;
    pan: boolean;
    udyam: boolean;
    authorisedRep: boolean;
    bankDetails: boolean;
  };
  biddingStats?: {
    tendersParticipated: number;
    activeBids: number;
    completedBids: number;
    complianceScore: number;
    documentsVerified: number;
    riskStatus: 'LOW' | 'MEDIUM' | 'HIGH';
  };
}
