export type UserRole = 'BIDDER' | 'PROCUREMENT_OFFICER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  designation: string;
  role: UserRole;
  companyId: string;
  avatar?: string;
  location?: string;
}
