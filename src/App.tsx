import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthForm } from "./pages/auth/Signin";
import Staff from "./pages/staff";
import Dashboard from "./pages/core/Dashboard";
import Admin from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserAuthForm />} />

        <Route path="/admin" element={<Dashboard />}>
          <Route index element={<Admin />} />
          <Route path="staffs" element={<Staff />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
