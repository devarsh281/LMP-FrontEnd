"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";

interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  status: string;
  role: string;
}

export default function AdminList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const admins: Admin[] = [
    { firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: 1234567890, status: "Active", role: "Admin" },
    { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com", phone: 9876543210, status: "Inactive", role: "Manager" },
    { firstName: "Sam", lastName: "Williams", email: "sam.williams@example.com", phone: 1122334455, status: "Active", role: "Admin" },
  ];

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
  }, [searchTerm, statusFilter]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admins</h1>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search admins..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px]">
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
            className="flex items-center gap-1 text-sm text-muted-foreground"
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

      <Table className="w-full">
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdmins.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-10">
                <span className="text-muted-foreground">No admins found</span>
              </TableCell>
            </TableRow>
          )}
          {filteredAdmins.map((admin, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium capitalize">
                {admin.firstName} {admin.lastName}
              </TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.phone}</TableCell>
              <TableCell>{admin.role}</TableCell>
              <TableCell>
                <Badge className="capitalize" variant={admin.status === "Active" ? "default" : "outline"}>
                  {admin.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
