import { LayoutBreadcrumb } from "../layout/layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "../../ui/breadcrumb";
import { ShieldCheck } from "lucide-react";
import Add from "./Add";



const AdminPage = () => {
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
      <Add/>
    </>
  );
};

export default AdminPage;