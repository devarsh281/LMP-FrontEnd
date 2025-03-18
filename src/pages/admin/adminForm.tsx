import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { AdminResponse, AdminStatus } from "./types";

interface AdminFormProps {
  data?: AdminResponse;
  closeModal: () => void;
  formType: "Admin";
  onSave?: (formData: AdminResponse) => void; 
}

const Add: React.FC<AdminFormProps> = ({ data, closeModal, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AdminResponse>({
    defaultValues: {
      firstname: data?.firstname ?? "",
      lastname: data?.lastname ?? "",
      email: data?.email ?? "",
      phone: data?.phone ?? "",
      status: data?.status ?? AdminStatus.ACTIVE,
      role: data?.role ?? "Admin",
      id: data?.id,
    },
  });

  const onSubmit = (formData: AdminResponse) => {
    const submittedData = {
      ...formData,
      id: data?.id ?? Date.now().toString(), 
      createdAt: data?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };

    console.log("Submitted Data:", submittedData);

    if (onSave) {
      onSave(submittedData);
    }

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
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  id="firstname"
                  placeholder="Enter first name"
                  {...register("firstname", { required: "First name is required" })}
                />
                {errors.firstname && (
                  <p className="text-red-500 text-xs">{errors.firstname.message}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  placeholder="Enter last name"
                  {...register("lastname", { required: "Last name is required" })}
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs">{errors.lastname.message}</p>
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
                  <option value={AdminStatus.ACTIVE}>Active</option>
                  <option value={AdminStatus.INACTIVE}>Inactive</option>
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