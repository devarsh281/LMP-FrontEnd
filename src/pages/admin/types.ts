export enum AdminStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface Admin {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  status: AdminStatus;
}

export interface AdminResponse extends Admin {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
