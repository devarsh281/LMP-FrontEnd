"use client";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Side";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDarkMode = savedDarkMode ?? systemDarkMode;
    setDarkMode(initialDarkMode);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
        {/* Sidebar on the left */}
        <Sidebar 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
        />

        {/* Right side with Navbar and content */}
        <div className="flex-1 flex flex-col w-full lg:ml-64">
          <Navbar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            toggleSidebar={toggleMobileMenu}
          />
          <main className="flex-1 pt-16 overflow-auto">
            <div className="container mx-auto p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}