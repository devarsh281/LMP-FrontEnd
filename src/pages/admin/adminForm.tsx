import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "../../../src/components/ui/form";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { Button } from "../../../src/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../../src/components/ui/select";
import { Card } from "../../../src/components/ui/card";
import { useForm } from "react-hook-form";
import { AdminRole, AdminStatus } from "./types";

export const AdminForm = ({
  onClose,
}: {
  onClose: () => void;
  isView?: boolean;
  isEdit?: boolean;
}) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobileNumber: "",
    status: AdminStatus.ACTIVE,
    role: AdminRole.ADMIN,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: AdminStatus) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleRoleChange = (value: AdminRole) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onClose();
  };
  const form = useForm();
  return (
    <Card className="p-6 border border-gray-300 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="firstname"
            render={() => (
              <FormItem>
                <Label htmlFor="firstname" className="block text-left">
                  First Name
                </Label>
                <FormControl>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastname"
            render={() => (
              <FormItem>
                <Label htmlFor="lastname" className="block text-left">
                  Last Name
                </Label>
                <FormControl>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={() => (
              <FormItem>
                <Label htmlFor="email" className="block text-left">
                  Email Address
                </Label>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="mobileNumber"
            render={() => (
              <FormItem>
                <Label htmlFor="mobileNumber" className="block text-left">
                  Mobile Number
                </Label>
                <FormControl>
                  <Input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            render={() => (
              <FormItem>
                <Label className="block text-left">Status</Label>
                <FormControl>
                  <Select
                    onValueChange={handleStatusChange}
                    defaultValue={formData.status}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AdminStatus.ACTIVE}>Active</SelectItem>
                      <SelectItem value={AdminStatus.INACTIVE}>
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="status"
            render={() => (
              <FormItem>
                <Label className="block text-left">Role</Label>
                <FormControl>
                  <Select
                    onValueChange={handleRoleChange}
                    defaultValue={formData.role}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={AdminRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={AdminRole.MANAGER}>
                        Manager
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-2 justify-end my-5">
            <Button type="submit">Submit</Button>
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
