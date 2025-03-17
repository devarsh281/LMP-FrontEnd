import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import React from "react";
import { useForm } from "react-hook-form";

interface Admin {
  username:string;
  email: string;
  phone: number;
  status: string;
  role: string;
}

interface AdminFormProps {
  data?: Admin;
  closeModal: () => void;
  formType: "Admin";
}

const Add: React.FC<AdminFormProps> = ({ data, closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Admin>({
    defaultValues: {
      username: data?.username ?? "",
      email: data?.email ?? "",
      phone: data?.phone,
      status: data?.status ?? "Active",
      role: data?.role ?? "Admin",
    },
  });

  const onSubmit = (formData: Admin) => {
    const admins = JSON.parse(localStorage.getItem('admins') || '[]');
    admins.push(formData);
    localStorage.setItem('admins', JSON.stringify(admins)); 
    console.log(formData);

    reset();
    closeModal();
  };

  const entityType = "Admin";
  const action = data ? "Update" : "Add new";

  const handleCancel = () => {
    reset();
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-5 py-2 space-y-6">
        <div className="flex justify-between items-center">
         <h1 className="text-3xl font-bold">
            {action} {entityType}
          </h1> 
          <div className="space-x-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>

        <Card className="space-y-6">
          <CardContent className="pt-6">
            <div className="grid gap-6 max-w-xl">
        
              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="username">Last Name</Label>
                <Input
                  id="username"
                  placeholder="Enter user name"
                  {...register("username", { required: "User name is required" })}
                />
                {errors.username && (
                  <p className="text-red-500 text-xs">{errors.username.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  type="tel"
                  {...register("phone", { required: "Phone number is required" })}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  {...register("status", { required: "Status is required" })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-xs">{errors.status.message}</p>
                )}
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  {...register("role", { required: "Role is required" })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="HR">HR</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs">{errors.role.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};

export default Add;
