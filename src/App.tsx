import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthForm } from "./components/custom/auth/Signin";
import AdminPage from "./components/custom/admin/page";
import Dashboard from "./components/custom/display/Dashboard";
import AddStaff from "./components/custom/staff/AddStaff";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuthForm />} />
          
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="page" element={<AdminPage />} /> 
            <Route path="staff" element={<AddStaff/>} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
