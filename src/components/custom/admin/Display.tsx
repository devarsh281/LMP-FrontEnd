"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Search, 
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Pencil,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { Button } from "../../ui/button";

interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  status: string;
  role: string;
}

interface AdminListProps {
  openModal: () => void;
}

export default function AdminList({ openModal }: AdminListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const storedAdmins = localStorage.getItem("admins");
    if (storedAdmins) {
      setAdmins(JSON.parse(storedAdmins));
    }
  }, []);

  const filteredAdmins = useMemo(() => {
    return admins.filter((admin) => {
      const searchMatch =
        !searchTerm ||
        admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch =
        !statusFilter ||
        statusFilter === "all" ||
        admin.status.toLowerCase() === statusFilter.toLowerCase();

      return searchMatch && statusMatch;
    });
  }, [searchTerm, statusFilter, admins]);

  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAdmins.slice(startIndex, endIndex);
  }, [filteredAdmins, currentPage, itemsPerPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col h-screen w-[950px] mx-auto">
      <div className="flex justify-between items-center p-4 shrink-0">
        <h1 className="text-3xl font-bold whitespace-nowrap">Admins</h1>
        <Button onClick={openModal}>Add Admin</Button>
      </div>

      <div className="flex flex-col flex-1 p-4 min-w-0">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search admins..."
              className="pl-8 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {(searchTerm || statusFilter) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-muted-foreground whitespace-nowrap"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-2">
          Showing {filteredAdmins.length}{" "}
          {filteredAdmins.length === 1 ? "admin" : "admins"}
          {(searchTerm || statusFilter) && " with current filters"}
        </div>

        <div className="flex-1 max-w-full overflow-x-auto flex flex-col">
          <div className="overflow-y-auto min-h-[350px]">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAdmins.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10">
                      <span className="text-muted-foreground">
                        No admins found
                      </span>
                    </TableCell>
                  </TableRow>
                )}
                {paginatedAdmins.map((admin, index) => (
                  <TableRow key={index}>
                    <TableCell className="capitalize">
                      {admin.firstName}
                    </TableCell>
                    <TableCell>{admin.lastName}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.phone}</TableCell>
                    <TableCell>{admin.role}</TableCell>
                    <TableCell>
                      <Badge
                        className="capitalize"
                        variant={
                          admin.status === "Active" ? "default" : "outline"
                        }
                      >
                        {admin.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Pencil className="text-xs flex-shrink-0" />
                        <Trash2 className="text-red-500 flex-shrink-0" />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
