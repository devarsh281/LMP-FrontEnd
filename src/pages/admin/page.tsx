"use client";

import { LayoutBreadcrumb } from "../../components/custom/layout/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../components/ui/breadcrumb";
import { ShieldCheck } from "lucide-react";
import Add from "./adminForm"; 
import Modal from "../../components/ui/modal";
import AdminList from ".";
import { useState } from "react";
<<<<<<< HEAD:src/components/custom/admin/page.tsx
import Modal from "../../ui/modal";
import Display from "./Display";
=======
>>>>>>> admin_module:src/pages/admin/page.tsx

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminData, setAdminData] = useState<any>(null); 
  const openModal = (data: any = null) => {
    setAdminData(data); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setAdminData(null); 
    setIsModalOpen(false);
  };

  return (
    <>
      <LayoutBreadcrumb>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <ShieldCheck className="h-4 w-4" />
              <BreadcrumbPage>Admin</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </LayoutBreadcrumb>

<<<<<<< HEAD:src/components/custom/admin/page.tsx
      <Display openModal={openModal} />

      {isModalOpen && (
        <Modal closeModal={closeModal} style={{ width: "400", height: "550px" }}>
          <Add closeModal={closeModal} formType="Admin" />
=======
      <AdminList openModal={openModal} />

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <Add data={adminData} closeModal={closeModal} formType="Admin" />
>>>>>>> admin_module:src/pages/admin/page.tsx
        </Modal>
      )}
    </>
  );
};

export default AdminPage;