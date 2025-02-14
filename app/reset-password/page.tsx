"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Password reset successful! You can now log in.");
    } else {
      setMessage(data.error || "❌ Password reset failed.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center relative w-full bg-black">
      {/* Starry Background */}
      <div className="absolute inset-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      {/* Reset Password Form */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-[90%] max-w-md text-center border border-white/20 animate-glow">
        <h2 className="text-3xl font-bold text-white mb-4">Reset Your Password</h2>
        <p className="text-gray-300 text-sm mb-6">Enter your new password below.</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full p-3 bg-white/20 text-white placeholder-gray-300 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4 transition-all duration-200"
        />

        <button
          onClick={handleReset}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-md w-full font-semibold text-lg tracking-wide transition-transform transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
        >
          Reset Password
        </button>

        {message && <p className="mt-4 text-gray-200">{message}</p>}
      </div>

      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); }
          50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.1); }
        }

        .animate-glow {
          animation: glow 2s infinite alternate ease-in-out;
        }
      `}</style>
    </div>
  );
}