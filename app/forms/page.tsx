"use client";

import { useState } from "react";
import FormBuilder, { type FormData } from "./form-builder";
import FormPreview from "./form-preview";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    title: "Untitled Form",
    questions: [],
  });
  const [view, setView] = useState<"builder" | "preview">("builder");

  const handleSave = (newFormData: FormData) => {
    setFormData(newFormData);
    console.log("Form saved:", newFormData);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Form Builder</h1>
        <div>
          <Button
            onClick={() => setView("builder")}
            variant={view === "builder" ? "default" : "outline"}
            className="mr-2"
          >
            Builder
          </Button>
          <Button
            onClick={() => setView("preview")}
            variant={view === "preview" ? "default" : "outline"}
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
  );
}
