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

      <AdminList openModal={openModal} />

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <Add data={adminData} closeModal={closeModal} formType="Admin" />
        </Modal>
      )}
    </>
  );
};

export default AdminPage;