export enum StaffStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
  }
  
 export interface Staff {
    name: string;
    email: string;
    phone: string;
    status: StaffStatus;
  }

export interface StaffResponse extends Staff {
    _id:string;
    createdAt: Date;
    updatedAt: Date;
}