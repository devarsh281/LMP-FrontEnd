import { useState } from "react";
import { Staff, StaffResponse, StaffStatus } from "./types";


const initialStaff: StaffResponse[] = [
    {
        _id: "1",
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        status: StaffStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "9876543210",
        status: StaffStatus.INACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        _id: "3",
        name: "Alice Brown",
        email: "alice@example.com",
        phone: "5556667777",
        status: StaffStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

const useStaff = () => {
    const [staffList, setStaffList] = useState<StaffResponse[]>(initialStaff);

    const deleteStaff = (id: string) => {
        setStaffList((prev) => prev.filter((staff) => staff._id !== id));
    };

    const updateStaff = (id: string, updatedData: Partial<Staff>) => {
        setStaffList((prev) =>
            prev.map((staff) =>
                staff._id === id ? { ...staff, ...updatedData, updatedAt: new Date() } : staff
            )
        );
    };

    return { staffList, deleteStaff, updateStaff };
};

export default useStaff;
