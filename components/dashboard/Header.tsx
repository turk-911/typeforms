"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";

export default function Header() {
  const [notifications, setNotifications] = useState(3);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    router.push("/");
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 flex items-center justify-between">
      <Link href="/dashboard" className="text-xl font-bold text-white">
        FormBuilder
      </Link>
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-300" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5 text-gray-300" />
        </Button>

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="hover:bg-red-500"
        >
          <LogOut className="h-5 w-5 text-gray-300" />
        </Button>
      </div>
    </header>
  );
}
