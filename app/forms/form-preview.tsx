"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData, Question } from "./form-builder";

interface FormPreviewProps {
  formData: FormData;
}

const FormPreview: React.FC<FormPreviewProps> = ({ formData }) => {
  const [responses, setResponses] = useState<Record<string, string | string[]>>(
    {}
  );

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setResponses((prev) => ({ ...prev, [questionId]: value }));
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case "singleChoice":
        return (
          <RadioGroup
            onValueChange={(value) => handleInputChange(question.id, value)}
            value={responses[question.id] as string}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case "multipleChoice":
        return (
          <div>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${index}`}
                  checked={(
                    (responses[question.id] as string[]) || []
                  ).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentResponses =
                      (responses[question.id] as string[]) || [];
                    const newResponses = checked
                      ? [...currentResponses, option]
                      : currentResponses.filter((r) => r !== option);
                    handleInputChange(question.id, newResponses);
                  }}
                />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </div>
        );
      case "shortAnswer":
        return (
          <Input
            value={(responses[question.id] as string) || ""}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        );
      case "longAnswer":
        return (
          <Textarea
            value={(responses[question.id] as string) || ""}
            onChange={(e) => handleInputChange(question.id, e.target.value)}
          />
        );
      case "dropdown":
        return (
          <Select
            onValueChange={(value) => handleInputChange(question.id, value)}
            value={responses[question.id] as string}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">{formData.title}</h1>
      {formData.questions.map((question) => (
        <div key={question.id} className="mb-6">
          <Label className="mb-2 block">
            {question.question}
            {question.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderQuestion(question)}
        </div>
      ))}
      <Button onClick={() => console.log(responses)}>Save Form</Button>
    </div>
  );
};

export default FormPreview;
