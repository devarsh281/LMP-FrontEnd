export enum AdminStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum AdminRole{
  ADMIN="Admin",
  MANAGER="Manager"
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
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}
