"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import Header from "../components/Header";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();
      if (data.isAuthenticated) {
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const text = await res.text(); // Read the response as text first
      let data;

      if (text) {
        try {
          data = JSON.parse(text); // Parse only if there is a response body
        } catch (err) {
          console.error("Invalid JSON:", text);
          setMessage("❌ Server returned invalid JSON.");
          return;
        }
      } else {
        data = {}; // Set to an empty object if no body
      }

      if (res.ok) {
        setMessage("✅ Login successful! Redirecting... 🚀");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      } else {
        setMessage(data.error || "❌ Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Something went wrong. Please try again.");
    }
  };
  if (loading) {
    return (
      <p className="text-center text-white">
        Checking authentication of this device
      </p>
    );
  }
  return (
    <div className="h-screen flex items-center justify-center relative w-full bg-black">
      <Header />
      {/* Starry Background */}
      <div className="absolute inset-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center border border-white/20 animate-glow"
      >
        <h1 className="text-3xl font-bold text-white mb-4">Login</h1>
        <p className="text-gray-300 text-sm mb-6">Sign in to your account</p>

        {/* Email Input */}
        <input
          className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 transition-all duration-200"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password Input */}
        <input
          className="w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 transition-all duration-200"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Login Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-md w-full font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          Login
        </button>

        {/* Message */}
        {message && <p className="mt-4 text-gray-200">{message}</p>}

        {/* Signup Link */}
        <p className="mt-4 text-gray-300 text-sm">
          Don't have an account?{" "}
          <Link href="/auth/register">
            <span className="text-purple-400 hover:underline cursor-pointer">
              Sign up
            </span>
          </Link>
        </p>
      </form>

      <style jsx>{`
        @keyframes glow {
          0% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
          50% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          100% {
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
          }
        }

        .animate-glow {
          animation: glow 2s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}
