import { LayoutBreadcrumb } from "../layout/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb";
import { ShieldCheck } from "lucide-react";
import Add from "./Add";
import { useState } from "react";
import Modal from "../../ui/modal";
import Display from "./Display";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
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

      <Display openModal={openModal} />

      {isModalOpen && (
        <Modal closeModal={closeModal} style={{ width: "400", height: "550px" }}>
          <Add closeModal={closeModal} formType="Admin" />
        </Modal>
      )}
    </>
  );
};

export default AdminPage;
