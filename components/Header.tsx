"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const navItems = [
  { name: "Features", href: "#features" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Pricing", href: "#pricing" },
  { name: "Testimonials", href: "#testimonials" },
];
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("auth_token");
    console.log("Token", token);
    setIsAuthenticated(!!token);
  }, []);
  console.log(isAuthenticated);
  const handleButtonClick = () => {
    if (isAuthenticated) {
      router.push("/dashboard");
    } else {
      router.push("/auth/register");
    }
  };
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">FormBuilder</span>
            <img className="h-8 w-auto" src="logo.png" alt="FormBuilder Logo" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-gray-300 transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button
            className="bg-white text-black hover:bg-gray-200"
            onClick={handleButtonClick}
          >
            Continue to dashboard
          </Button>
        </div>
      </nav>
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black bg-opacity-90 backdrop-blur-md p-6 transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">FormBuilder</span>
            <img
              className="h-8 w-auto"
              src="/placeholder.svg?height=32&width=32"
              alt="FormBuilder Logo"
            />
          </a>
          <button
            type="button"
            className="-m-2.5 rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span className="sr-only">Close menu</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6">
          <nav className="space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-lg font-semibold text-white hover:text-indigo-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="mt-6">
            <Button
              className="w-full bg-white text-black hover:bg-gray-200"
              onClick={handleButtonClick}
            >
              Continue to dashboard
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
