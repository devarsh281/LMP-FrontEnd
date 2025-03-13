import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  status: string;
  role: string;
}

function Add() {
  const [addAdmin, setAddAdmin] = useState<Admin>({
    firstName: "",
    lastName: "",
    email: "",
    phone:0,
    status: "",
    role: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddAdmin((prev) => ({
      ...prev,
      [name]: name === "phone" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(addAdmin);
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl bg-white/80 backdrop-filter backdrop-blur-lg">
          <CardHeader className="bg-black text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">
              Add New Admin
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={handleChange}
                  value={addAdmin.firstName}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={handleChange}
                  value={addAdmin.lastName}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={addAdmin.email}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Input
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  value={addAdmin.phone}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="status"
                  placeholder="Status"
                  onChange={handleChange}
                  value={addAdmin.status}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="role"
                  placeholder="Role"
                  onChange={handleChange}
                  value={addAdmin.role}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-black text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Add Admin
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Add;
