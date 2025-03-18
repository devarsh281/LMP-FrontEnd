import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthForm } from "./pages/auth/Signin";
import Staff from "./pages/staff";
import AdminPage from "./pages/admin/page";
import Dashboard from "./pages/core/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuthForm />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="admin" element={<AdminPage />} />
            <Route path="staffs" element={<Staff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
