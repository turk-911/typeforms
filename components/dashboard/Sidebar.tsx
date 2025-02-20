"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  BarChart2,
  Users,
  Settings,
  LogOut,
  Menu,
  Plus,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, name: "Dashboard", href: "/dashboard" },
  { icon: FileText, name: "Forms", href: "/dashboard/forms" },
  { icon: BarChart2, name: "Analytics", href: "/dashboard/analytics" },
  { icon: Users, name: "Team", href: "/dashboard/team" },
  { icon: Settings, name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/");
  };

  const handleCreateNewForm = () => {
    router.push("/forms");
  };

  return (
    <div
      className={`bg-black border-r border-gray-200 ${
        isCollapsed ? "w-16" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full cursor-pointer">
        <div className="flex items-center justify-between h-16 px-4" onClick={() => setIsCollapsed(!isCollapsed)}>
          {!isCollapsed && (
            <span className="text-xl font-semibold text-white ">
              Collapse Sidebar
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto hover:text-black"
          >
            <Menu className="h-6 w-6 text-white hover:text-black" />
          </Button>
        </div>

        {/* Create New Form Button */}
        <div className="px-4 py-2">
          <Button
            className="w-full flex items-center justify-center bg-white text-black hover:bg-gray-800 hover:text-white transition-all"
            onClick={handleCreateNewForm}
          >
            <Plus className={`h-5 w-5 ${!isCollapsed ? "mr-2" : ""}`} />
            {!isCollapsed && "Create New Form"}
          </Button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="py-4">
            {menuItems.map((item) => (
              <li key={item.name} className="py-0.5 px-2">
                <Link href={item.href} passHref>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-white"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isCollapsed ? "mr-0" : "mr-3"}`}
                    />
                    {!isCollapsed && <span>{item.name}</span>}
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className={`h-5 w-5 ${isCollapsed ? "mr-0" : "mr-3"}`} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
