import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa"; 
import Sidebar from "./Side";



const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className={`overflow-x-hidden ${darkMode ? "dark" : ""}`}>
      <Sidebar />
      <div className="pt-16 sm:ml-64 p-5">
        <div
          className="fixed top-5 right-5 p-3 bg-gray-600 rounded-full cursor-pointer z-50"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <FaSun className="text-yellow-400 text-xl" />
          ) : (
            <FaMoon className="text-gray-400 text-xl" />
          )}
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
