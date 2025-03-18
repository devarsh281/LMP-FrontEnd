"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut, Menu, MonitorCog } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar?: () => void;
}

export default function Navbar({
  darkMode,
  setDarkMode,
  toggleSidebar,
}: NavbarProps) {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<string | null>("");

  const user = {
    name: "Admin",
    isLoggedIn: true,
  };

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      setDarkMode(savedTheme === "dark");
    } else {
      setTheme(systemTheme);
      setDarkMode(systemTheme === "dark");
    }

    document.documentElement.classList.add(darkMode ? "dark" : "light");

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [darkMode, setDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const toggleDarkMode = (mode: "light" | "dark" | "system") => {
    let newTheme = mode;

    if (mode === "system") {
      newTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    setDarkMode(newTheme === "dark");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full h-16 transition-all duration-300",
        "lg:left-64 lg:w-[calc(100%-16rem)]"
      )}
    >
      <div className="h-full px-4 md:container md:mx-auto md:px-6">
        <div className="flex h-full items-center justify-between">
          <div className="flex items-center gap-3">
            {toggleSidebar && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className={cn(
                  "lg:hidden rounded-full",
                  scrolled
                    ? "text-foreground hover:bg-muted"
                    : "text-white hover:bg-white/10"
                )}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user.isLoggedIn && (
              <span
                className={cn(
                  "hidden md:block transition-colors text-sm",
                  darkMode ? "text-white" : "text-black"
                )}
              >
                Welcome, {user.name}
              </span>
            )}

            {user.isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt={user.name}
                    />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200">
                      <span className="text-lg font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer gap-2">
                    <User className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => toggleDarkMode("light")}
                  >
                    <Sun className="h-4 w-4 text-amber-500" />
                    <span>Light Mode</span>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => toggleDarkMode("dark")}
                  >
                    <Moon className="h-4 w-4 text-indigo-400" />
                    <span>Dark Mode</span>
                  </DropdownMenuItem> */}
                  {/* <DropdownMenuItem
                    className="cursor-pointer gap-2"
                    onClick={() => toggleDarkMode("system")}
                  >
                    <MonitorCog className="h-4 w-4 text-amber-500" />
                    <span>System Default</span>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer gap-2 text-rose-500 focus:text-rose-500 dark:text-rose-400 dark:focus:text-rose-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
