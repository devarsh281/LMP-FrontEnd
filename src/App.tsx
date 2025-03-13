import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthForm } from "./components/custom/auth/Signin";
import Add from "./components/custom/admin/Add";
import AdminPage from "./components/custom/admin/page";
import Dashboard from "./components/custom/display/Dashboard"; 

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuthForm />} />
          
          <Route element={<Dashboard />}>
            <Route path="/page" element={<AdminPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin/addadmin" element={<Add />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
