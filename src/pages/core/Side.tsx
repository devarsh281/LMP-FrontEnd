"use client";

import { Link, useLocation } from "react-router-dom";
import {
  Users,
  Settings,
  HelpCircle,
  X,
  MapPin,
  Briefcase,
  Building,
  LocateFixed,
  LucideOctagonAlert,
  PanelsRightBottom,
  User2,
  UserCheck2,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";
import { FaBusinessTime } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();

  const menuItems = [
    { icon: User2, label: "Admin", path: "admin" },
    { icon: Users, label: "Staff", path: "staff" },
    { icon: MapPin, label: "Location", path: "/dashboard/users" },
    { icon: PanelsRightBottom, label: "Bookings", path: "/dashboard/products" },
    { icon: UserCheck2, label: "Property Owners", path: "/dashboard/calendar" },
    { icon: Briefcase, label: "Business Accounts", path: "/dashboard/reports" },
    { icon: FaBusinessTime, label: "Brands", path: "/dashboard/settings" },
    { icon: HelpCircle, label: "Branding Request", path: "/dashboard/help" },
    {
      icon: HelpCircle,
      label: "Brands Categories",
      path: "/dashboard/reports",
    },
    { icon: Building, label: "Cities", path: "/dashboard/settings" },
    { icon: LocateFixed, label: "Location Type", path: "/dashboard/help" },
    {
      icon: LucideOctagonAlert,
      label: "Location Categories",
      path: "/dashboard/help",
    },
    { icon: HelpCircle, label: "Budget Items", path: "/dashboard/help" },
    { icon: Settings, label: "Configurations", path: "/dashboard/settings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 bg-black",
          "dark:bg-slate-900 dark:border-slate-800",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-center items-center p-10  h-16 text-white">
            <img src="vite.svg" alt="Logo" height={20} width={40}/>
            <h3 className="ml-2">Name</h3>
          </div>

          <div className="flex items-center justify-between p-4 lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          <ScrollArea className="flex-1 px-3 py-2">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.path)
                      ? "bg-indigo-600 text-white dark:bg-indigo-800 dark:text-white"
                      : "text-white hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-indigo-300"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive(item.path)
                        ? "text-white dark:text-white"
                        : "text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:group-hover:text-indigo-300"
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  );
}
