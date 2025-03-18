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
    { icon: User2, label: "Admin", path: "/admin" },
    { icon: Users, label: "Staff", path: "/admin/staffs" },
    { icon: MapPin, label: "Location", path: "/admin/location" },
    { icon: PanelsRightBottom, label: "Bookings", path: "/admin/bookings" },
    { icon: UserCheck2, label: "Property Owners", path: "/admin/owners" },
    {
      icon: Briefcase,
      label: "Business Accounts",
      path: "/admin/business-accounts",
    },
    { icon: FaBusinessTime, label: "Brands", path: "/admin/brands" },
    {
      icon: HelpCircle,
      label: "Branding Request",
      path: "/admin/branding-request",
    },
    {
      icon: HelpCircle,
      label: "Brands Categories",
      path: "/admin/brands-categories",
    },
    { icon: Building, label: "Cities", path: "/admin/cities" },
    { icon: LocateFixed, label: "Location Type", path: "/admin/location-type" },
    {
      icon: LucideOctagonAlert,
      label: "Location Categories",
      path: "/admin/location-categories",
    },
    { icon: HelpCircle, label: "Budget Items", path: "/admin/budget-items" },
    { icon: Settings, label: "Configurations", path: "/admin/configurations" },
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
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 ",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "#1689FE" }}
      >
        <div className="flex h-full flex-col">
          <div className="flex justify-center items-center p-10  h-16 text-white">
            <img src="vite.svg" alt="Logo" height={20} width={40} />
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
                    "text-white hover:bg-indigo-50 hover:text-gray-500 dark:text-slate-300 dark:hover:bg-slate-800/60 dark:hover:text-gray-500"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-colors duration-200 hover:text-gray-500"
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
