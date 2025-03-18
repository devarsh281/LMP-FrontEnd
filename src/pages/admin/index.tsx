import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Input } from "../../components/ui/input";
import { Pencil, Search, Trash } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useAdmin from "./useAdmin";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../../../src/components/ui/alert-dialog";
import { Button } from "../../components/ui/button";

interface AdminListProps {
  openModal: (adminData: any) => void;
}

const AdminList = ({ openModal }: AdminListProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [searchPhone, setSearchPhone] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [selectedAdminId, setSelectedAdminId] = useState<string | null>(null);
  // const[admin,setAdmin]=useState<any[]>([])
  const navigate = useNavigate();
  const { adminList, deleteAdmin } = useAdmin();

  const handleDeleteClick = (adminId: string) => {
    setSelectedAdminId(adminId);
    setOpen(true);
  };

  const confirmDelete = () => {
    if (selectedAdminId) {
      deleteAdmin(selectedAdminId);
      setOpen(false);
    }
  };

  const filteredAdmin = useMemo(() => {
    return adminList.filter((admin) => {
      const searchLower = searchTerm.toLowerCase();
      const emailLower = searchEmail.toLowerCase();
      const phoneLower = searchPhone.toLowerCase();

      return (
        (!searchTerm ||
          admin.firstname.toLowerCase().includes(searchLower) ||
          admin.lastname.toLowerCase().includes(searchLower)) &&
        (!searchEmail || admin.email.toLowerCase().includes(emailLower)) &&
        (!searchPhone || admin.phone.includes(phoneLower))
      );
    });
  }, [searchTerm, searchEmail, searchPhone, adminList]);

 
  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admins</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 justify-between">
        <div className="flex gap-4">
          {/* Search by Name */}
          <div className="relative">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <Button onClick={() => openModal(null)}>Add New</Button>
        </div>
      </div>

      <Table className="w-full border rounded-lg shadow-md">
        <TableHeader className="bg-gray-100 dark:bg-gray-800 items-center">
          <TableRow>
          <TableHead className="p-3 text-center font-bold text-black">
             ID
            </TableHead>
            <TableHead className="p-3 text-center font-bold text-black">
              First Name
            </TableHead>
            <TableHead className="p-3 text-center font-bold text-black">
              Last Name
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Email
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Phone
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Status
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Role
            </TableHead>
            <TableHead className="text-center font-bold text-black">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdmin.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                <span className="text-muted-foreground">No admins found</span>
              </TableCell>
            </TableRow>
          ) : (
            filteredAdmin.map((admin) => (
              <TableRow
                key={admin.id}
                className="hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                onClick={() => navigate(`/admin/${admin.id}`)}
              >
                <TableCell className="p-3 ">
                  {admin.id}
                </TableCell>
                <TableCell className="p-3 font-medium capitalize">
                  {admin.firstname}
                </TableCell>
                <TableCell className="p-3 font-medium capitalize">
                  {admin.lastname}
                </TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>{admin.phone}</TableCell>
                <TableCell>{admin.status}</TableCell>
                <TableCell>{admin.role}</TableCell>
                <TableCell className="flex items-center justify-center">
                  {/* Edit Button */}
                  <div
                    className="p-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop row click
                      openModal(admin); // Pass admin data properly
                    }}
                  >
                    <Pencil className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  </div>

                  {/* Delete Button */}
                  <div
                    className="p-2 rounded-md cursor-pointer hover:bg-red-100 dark:hover:bg-red-700 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(admin.id.toString());
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

      {/* AlertDialog for Confirmation */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Are you sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-gray-600 dark:text-gray-300">
              This will permanently delete the Admin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpen(false)}
              className="text-base"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminList;
