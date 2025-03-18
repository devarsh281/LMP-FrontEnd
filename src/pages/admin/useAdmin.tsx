import { useState } from "react";
import {  AdminResponse, AdminRole, AdminStatus } from "./types";

const initialadmin: AdminResponse[] = [
    {
        _id: "1",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        status: AdminStatus.ACTIVE,
        role: AdminRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "2",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        phone: "9876543210",
        status: AdminStatus.ACTIVE,
        role: AdminRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "3",
        firstname: "Alice",
        lastname: "Brown",
        email: "alice@example.com",
        phone: "5556667777",
        status: AdminStatus.ACTIVE,
        role: AdminRole.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const useAdmin = () => {
    const [adminList, setAdminList] = useState<AdminResponse[]>(initialadmin);
    
   

    const deleteAdmin = (id: string) => {
        setAdminList((prev) => prev.filter((admin) => admin._id !== id));
    };

    const updateAdmin = (id: string, updatedData: Partial<AdminResponse>) => {
        setAdminList((prev) =>
            prev.map((admin) =>
                admin._id === id ? { ...admin, ...updatedData, updatedAt: new Date() } : admin
            )
        );
    };
   

   
    return { adminList, deleteAdmin, updateAdmin };
};

export default useAdmin;


