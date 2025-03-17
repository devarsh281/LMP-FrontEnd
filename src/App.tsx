import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserAuthForm } from "./components/custom/auth/Signin";
import AdminPage from "./components/custom/admin/page";
import Dashboard from "./components/custom/display/Dashboard"; 
import Navbar from "./components/custom/display/Navbar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserAuthForm />} />
          <Route element={<Dashboard />}>
            <Route path="/page" element={<AdminPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/navbar" element={<Navbar />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
