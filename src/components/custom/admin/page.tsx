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
import { Button } from "../../ui/button";
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

      <Button onClick={openModal}>Add Admin</Button>

      {isModalOpen && (
        <Modal
          closeModal={closeModal}
          style={{ width: "100px", height: "100px" }}
        >
          <Add closeModal={closeModal} formType="Admin" />
        </Modal>
      )}
      <Display />
    </>
  );
};

export default AdminPage;
