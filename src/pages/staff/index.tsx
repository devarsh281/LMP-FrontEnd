
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../src/components/ui/table";
import { Badge } from "../../../src/components/ui/badge";
import { Input } from "../../../src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../src/components/ui/select";
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from "lucide-react";
import { Button } from "../../../src/components/ui/button"
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "../../../src/components/ui/alert-dialog";
import useStaff from "./useStaff";
const staffMembers = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", phone: "1234567890", status: "Active" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", phone: "9876543210", status: "Inactive" },
    { id: 3, firstName: "Alice", lastName: "Brown", email: "alice@example.com", phone: "5556667777", status: "Active" },
];

const Staff = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [searchName, setSearchName] = useState<string>("");
    const [searchEmail, setSearchEmail] = useState<string>("");
    const [searchPhone, setSearchPhone] = useState<string>("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
   const { staffList, deleteStaff, updateStaff } = useStaff()
    const handleDeleteClick = (staffId: string) => {
        deleteStaff(staffId);
        setOpen(true);
    };

    const confirmDelete = () => {
        
        setOpen(false);
    };
    const filteredStaff = useMemo(() => {
        return staffList.filter((staff) => {
            const fullName = staff.name;
            const searchLower = searchTerm.toLowerCase();

            return (
                (!searchTerm ||
                    fullName.includes(searchLower) ||
                    staff.email.toLowerCase().includes(searchLower) ||
                    staff.phone.includes(searchLower)) &&
                (!statusFilter || statusFilter === "all" || staff.status === statusFilter)
            );
        });
    }, [searchTerm, statusFilter]);

    return (
        <div className=" mx-auto ">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Staff Members</h1>
            </div>


            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 justify-between">
                <div className="flex gap-4">
                    {/* Search by Name */}
                    <div className="relative ">
                        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name..."
                            className="pl-8"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>

                    {/* Search by Email */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by email..."
                            className="pl-8"
                            value={searchEmail}
                            onChange={(e) => setSearchEmail(e.target.value)}
                        />
                    </div>

                    {/* Search by Phone */}
                    <div className="relative">
                        <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by phone..."
                            className="pl-8"
                            value={searchPhone}
                            onChange={(e) => setSearchPhone(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <Button>
                        Add New
                    </Button>
                </div>

            </div>




            {/* Staff Table */}
            <Table className="w-full border rounded-lg shadow-md">
                <TableHeader className="bg-gray-100 dark:bg-gray-800 items-center">
                    <TableRow >
                        <TableHead className="p-3 text-center font-bold text-black">Name</TableHead>
                        <TableHead className="text-center font-bold text-black">Email</TableHead>
                        <TableHead className="text-center font-bold text-black">Phone</TableHead>
                        <TableHead className="text-center font-bold text-black">Status</TableHead>
                        <TableHead className="text-center font-bold text-black">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredStaff.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
                                <span className="text-muted-foreground">No staff members found</span>
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredStaff.map((staff) => (
                            <TableRow
                                key={staff.id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                onClick={() => navigate(`/staff/${staff.id}`)}
                            >
                                <TableCell className="p-3 font-medium capitalize">
                                  {staff.name}
                                </TableCell>
                                <TableCell>{staff.email}</TableCell>
                                <TableCell>{staff.phone}</TableCell>

                                <TableCell>

                                    {staff.status}

                                </TableCell>
                                <TableCell className="flex items-center justify-center">
                                    {/* Edit Button */}
                                    <div
                                        className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        onClick={() => navigate(`/updateStaffForm/${staff.id}`)}
                                    >
                                        <Pencil className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    </div>

                                    {/* Delete Button */}
                                    <div
                                        className="p-2 rounded-md cursor-pointer hover:bg-red-100 dark:hover:bg-red-700 transition"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent row click from triggering
                                            handleDeleteClick(staff.id);
                                        }}
                                    >
                                        <Trash className="w-5 h-5 text-red-500 hover:text-red-700" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent className="p-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-300">
                            This will permanently delete the Staff Member.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => setOpen(false)}
                            className="text-base"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </div>
    );
};

export default Staff;

