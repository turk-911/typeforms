"use client";

import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center bg-black">
      {/* Starry Background */}
      <div className="absolute inset-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Create. Embed. Collect.
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">
            {" "}
            Simplify Forms.
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Effortlessly build and integrate smart forms into your projects—no coding required.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border px-6 py-3 rounded-lg font-semibold flex items-centerborder-indigo-500 text-indigo-400 transition-all"
          >
            <Play className="mr-2 h-4 w-4" /> Watch Demo
          </Button>
        </div>
      </div>

      {/* Demo Section */}
      <div className="relative z-10 mt-16 max-w-3xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl p-6 animate-float">
          <img
            src="/placeholder.svg?height=300&width=600"
            alt="Form Builder Demo"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}