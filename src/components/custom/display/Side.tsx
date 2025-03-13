import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useNavigate } from "react-router-dom";

const menuItems = [
  {
    label: "Admin Management",
    path: "",
    subMenus: [
      { label: "User Admin", path: "/admin/users" },
      { label: "Add Admin", path: "/page" },
    ],
  },
  {
    label: "Staff Management",
    path: "/staff",
    subMenus: [
      { label: "Staff List", path: "/staff/list" },
      { label: "Add Staff", path: "/staff/add" },
    ],
  },
  {
    label: "Location Management",
    path: "/locations",
    subMenus: [
      { label: "View Locations", path: "/locations/view" },
      { label: "Add Location", path: "/locations/add" },
    ],
  },
  {
    label: "Bookings Management",
    path: "/bookings",
    subMenus: [
      { label: "All Bookings", path: "/bookings/all" },
      { label: "Pending Bookings", path: "/bookings/pending" },
    ],
  },
  {
    label: "Production House",
    path: "/production",
    subMenus: [
      { label: "Houses", path: "/production/houses" },
      { label: "Equipment", path: "/production/equipment" },
    ],
  },
  {
    label: "Property Owner",
    path: "/property",
    subMenus: [
      { label: "Owner List", path: "/property/owners" },
      { label: "Properties", path: "/property/list" },
    ],
  },
  {
    label: "Brands Management",
    path: "/brands",
    subMenus: [
      { label: "All Brands", path: "/brands/all" },
      { label: "Featured Brands", path: "/brands/featured" },
    ],
  },
  {
    label: "Branding Requests",
    path: "/branding-requests",
    subMenus: [
      { label: "New Requests", path: "/branding-requests/new" },
      { label: "Approved", path: "/branding-requests/approved" },
    ],
  },
  {
    label: "Brand Categories",
    path: "/categories",
    subMenus: [
      { label: "View Categories", path: "/categories/view" },
      { label: "Add Category", path: "/categories/add" },
    ],
  },
  {
    label: "Cities",
    path: "/cities",
    subMenus: [
      { label: "City List", path: "/cities/list" },
      { label: "Add City", path: "/cities/add" },
    ],
  },
];

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const navigate = useNavigate();
  const currentPath = "";
  const isActive = (path: string) => currentPath === path;

  const handleLogout = () => {
    console.log("Logging out");
    navigate("/");
  };

  const toggleSubmenu = (path: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  return (
    <div className="overflow-x-hidden">
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full bg-black text-white p-4 z-50 sm:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-white font-medium">Admin</h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <motion.li
                    key={item.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col"
                  >
                    <div
                      className={cn(
                        "flex items-center p-3 rounded-md transition-all duration-200 cursor-pointer",
                        isActive(item.path)
                          ? "bg-purple-500 text-white"
                          : "hover:bg-purple-500 hover:text-white"
                      )}
                      onClick={() => toggleSubmenu(item.path)}
                    >
                      <span className="truncate">{item.label}</span>
                    </div>

                    <AnimatePresence>
                      {expandedMenus[item.path] && item.subMenus && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-8 mt-1 space-y-1"
                        >
                          {item.subMenus.map((subItem) => (
                            <motion.li
                              key={subItem.path}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <a
                                href={subItem.path}
                                className="block p-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-900/50 truncate"
                              >
                                {subItem.label}
                              </a>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 flex items-center space-x-3 p-3 rounded-md bg-gray-900 text-white hover:bg-gray-800"
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                  <span>Logout</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar (Desktop) */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="hidden sm:block bg-black text-sm text-white h-screen w-64 fixed top-0 left-0 shadow-xl"
      >
        <nav className="flex flex-col h-full">
          <div
            className="flex-1 overflow-y-auto p-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <h3 className="text-xl mt-2 font-semibold text-gray-200 mb-6">
              Dashboard
            </h3>

            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                    duration: 0.3,
                  }}
                  className="flex flex-col"
                >
                  <div
                    className={cn(
                      "flex items-center p-3 rounded-md transition-all duration-300 cursor-pointer border-l-2",
                      isActive(item.path)
                        ? "bg-gray-800 text-white border-l-purple-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white border-l-transparent hover:border-l-purple-500"
                    )}
                    onClick={() => toggleSubmenu(item.path)}
                  >
                    <span className="truncate">{item.label}</span>

                    {isActive(item.path) && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedMenus[item.path] && item.subMenus && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-1 space-y-1 border-l border-gray-800 pl-2"
                      >
                        {item.subMenus.map((subItem) => (
                          <motion.li
                            key={subItem.path}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <a
                              href={subItem.path}
                              className="block p-2 text-sm text-gray-400 hover:text-white rounded-md hover:bg-gray-800 transition-all duration-200 truncate"
                            >
                              {subItem.label}
                            </a>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="p-4 border-t border-gray-800"
              >
                <motion.button
                  onClick={handleLogout}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 rounded-md bg-[#0a0a0a] text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </motion.div>
            </ul>
          </div>
        </nav>
      </motion.div>
    </div>
  );
}
