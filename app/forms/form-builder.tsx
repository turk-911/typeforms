"use client";

import type React from "react";
import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { GripVertical } from "lucide-react";

export type QuestionType =
  | "singleChoice"
  | "multipleChoice"
  | "shortAnswer"
  | "longAnswer"
  | "dropdown";

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  required: boolean;
}

export interface FormData {
  title: string;
  questions: Question[];
}

interface FormBuilderProps {
  initialFormData?: FormData;
  onSave: (formData: FormData) => void;
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  initialFormData,
  onSave,
}) => {
  const [formData, setFormData] = useState<FormData>(
    initialFormData || {
      title: "Untitled Form",
      questions: [],
    }
  );

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      question: "",
      options: ["Option 1"],
      required: false,
    };
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));
  };

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === id ? { ...q, ...updatedQuestion } : q
      ),
    }));
  };

  const addOption = (questionId: string) => {
    setFormData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: [
                ...(q.options || []),
                `Option ${(q.options?.length || 0) + 1}`,
              ],
            }
          : q
      ),
    }));
  };

  const onDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) return;

      const newQuestions = Array.from(formData.questions);
      const [reorderedItem] = newQuestions.splice(result.source.index, 1);
      newQuestions.splice(result.destination.index, 0, reorderedItem);

      setFormData((prev) => ({ ...prev, questions: newQuestions }));
    },
    [formData.questions]
  );

  return (
    <div className="container mx-auto p-4">
      <Input
        value={formData.title}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, title: e.target.value }))
        }
        className="text-2xl font-bold mb-4"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="questions">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {formData.questions.map((question, index) => (
                <Draggable
                  key={question.id}
                  draggableId={question.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4 p-4 border rounded-lg"
                    >
                      <div className="flex items-center mb-2">
                        <div {...provided.dragHandleProps} className="mr-2">
                          <GripVertical className="text-gray-400" />
                        </div>
                        <Input
                          value={question.question}
                          onChange={(e) =>
                            updateQuestion(question.id, {
                              question: e.target.value,
                            })
                          }
                          placeholder="Enter your question"
                          className="flex-grow"
                        />
                      </div>
                      {(question.type === "singleChoice" ||
                        question.type === "multipleChoice" ||
                        question.type === "dropdown") && (
                        <div className="ml-6">
                          {question.options?.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className="flex items-center mb-2"
                            >
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateQuestion(question.id, {
                                    options: question.options?.map((opt, idx) =>
                                      idx === optionIndex ? e.target.value : opt
                                    ),
                                  })
                                }
                                className="flex-grow"
                              />
                            </div>
                          ))}
                          <Button
                            onClick={() => addOption(question.id)}
                            variant="outline"
                            size="sm"
                          >
                            Add Option
                          </Button>
                        </div>
                      )}
                      <div className="flex items-center mt-2">
                        <Label
                          htmlFor={`required-${question.id}`}
                          className="mr-2"
                        >
                          Required
                        </Label>
                        <Switch
                          id={`required-${question.id}`}
                          checked={question.required}
                          onCheckedChange={(checked) =>
                            updateQuestion(question.id, { required: checked })
                          }
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="mt-4">
        <Label>Add Question</Label>
        <Select onValueChange={(value: QuestionType) => addQuestion(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="singleChoice">Single Choice</SelectItem>
            <SelectItem value="multipleChoice">Multiple Choice</SelectItem>
            <SelectItem value="shortAnswer">Short Answer</SelectItem>
            <SelectItem value="longAnswer">Long Answer</SelectItem>
            <SelectItem value="dropdown">Dropdown</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="mt-4" onClick={() => onSave(formData)}>
        Save Form
      </Button>
    </div>
  );
};

export default FormBuilder;
