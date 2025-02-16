"use client";

import { useState } from "react";
import FormBuilder, { type FormData } from "./form-builder";
import FormPreview from "./form-preview";
import { Button } from "@/components/ui/button";
import { GridBackground } from "@/components/forms/grid-background";
import Header from "@/components/Header";

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    title: "Untitled Form",
    questions: [],
  });
  const [view, setView] = useState<"builder" | "preview">("builder");

  const handleSave = (newFormData: FormData) => {
    setFormData(newFormData);
    setView("preview");
    console.log("Form saved:", newFormData);
  };

  return (
    <div className="relative w-full h-screen flex flex-col items-center ">
      {/* Background Grid */}
      <div className="absolute inset-0 w-full h-full -z-1000">
        <GridBackground />
      </div>

      <Header />
      <div className="relative z-1000 container mx-auto p-4 bg-gray-800 bg-opacity-90 shadow-lg rounded-lg my-32">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Form Builder</h1>
          <div>
            <Button
              onClick={() => setView("builder")}
              className={`mr-2 ${
                view === "builder"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
              }`}
            >
              Builder
            </Button>
            <Button
              onClick={() => setView("preview")}
              className={`${
                view === "preview"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white hover:bg-white hover:text-black"
              }`}
            >
              Preview
            </Button>
          </div>
        </div>
        {view === "builder" ? (
          <FormBuilder initialFormData={formData} onSave={handleSave} />
        ) : (
          <FormPreview formData={formData} />
        )}
      </div>
    </div>
  );
}
