import type { User, Company } from '../types';

export const mockUser: User = {
  id: 'user-001',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@abctech.in',
  phone: '+91 98765 43210',
  designation: 'Business Development Manager',
  role: 'BIDDER',
  companyId: 'company-001',
};

export const mockCompany: Company = {
  id: 'company-001',
  legalName: 'ABC Technologies Pvt. Ltd.',
  registrationNumber: 'U72200DL2015PTC281456',
  gstin: '07AABCA1234B1Z5',
  pan: 'AABCA1234B',
  udyamNumber: 'UDYAM-DL-07-0012345',
  category: 'IT & Electronics',
  address: '42, Tech Park, Sector 62, Noida, Uttar Pradesh 201309',
  verificationStatus: {
    registration: true,
    gst: true,
    pan: true,
    udyam: true,
    authorisedRep: true,
    bankDetails: true,
  },
};
