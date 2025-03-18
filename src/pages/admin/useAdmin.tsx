import { useState } from "react";
import {  AdminResponse, AdminStatus } from "./types";

const initialadmin: AdminResponse[] = [
    {
        id: "1",
        firstname: "John",
        lastname: "Doe",
        email: "john@example.com",
        phone: "1234567890",
        status: AdminStatus.ACTIVE,
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "2",
        firstname: "Jane",
        lastname: "Smith",
        email: "jane@example.com",
        phone: "9876543210",
        status: AdminStatus.ACTIVE,
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        id: "3",
        firstname: "Alice",
        lastname: "Brown",
        email: "alice@example.com",
        phone: "5556667777",
        status: AdminStatus.ACTIVE,
        role: "Admin",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const useAdmin = () => {
    const [adminList, setAdminList] = useState<AdminResponse[]>(initialadmin);
    
   

    const deleteAdmin = (id: string) => {
        setAdminList((prev) => prev.filter((admin) => admin.id !== id));
    };

    const updateAdmin = (id: string, updatedData: Partial<AdminResponse>) => {
        setAdminList((prev) =>
            prev.map((admin) =>
                admin.id === id ? { ...admin, ...updatedData, updatedAt: new Date() } : admin
            )
        );
    };

    return { adminList, deleteAdmin, updateAdmin };
};

export default useAdmin;


