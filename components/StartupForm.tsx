"use client";

import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

interface FormState {
  title: string;
  description: string;
  category: string;
  link: string;
  pitch: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormState>({
    title: "",
    description: "",
    category: "",
    link: "",
    pitch: "",
  });
  const [isPending, setIsPending] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();
  const router = useRouter();

  // Debounced input handler to prevent too many state updates
  const handleInputChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Remove the trim() here to allow spaces
    }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const handlePitchChange = useCallback((value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      pitch: value || "", // Remove the trim() here to allow spaces
    }));
    
    if (errors.pitch) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.pitch;
        return newErrors;
      });
    }
  }, [errors]);

  const validateFormData = async (data: FormState) => {
    // Additional validation beyond Zod
    if (data.link && !data.link.startsWith('https://')) {
      throw new Error('Image URL must start with https://');
    }

    // Only trim leading and trailing whitespace before submission
    const trimmedData = {
      ...data,
      title: data.title.trim(),
      description: data.description.trim(),
      category: data.category.trim(),
      link: data.link.trim(),
      pitch: data.pitch.trim(),
    };

    // Check if any field is empty after trimming
    for (const [key, value] of Object.entries(trimmedData)) {
      if (!value) {
        throw new Error(`${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`);
      }
    }

    return formSchema.parseAsync(trimmedData);
  };

  const retrySubmission = async (formDataObj: FormData, retryCount: number): Promise<any> => {
    try {
      return await createPitch({}, formDataObj, formData.pitch);
    } catch (error) {
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        return retrySubmission(formDataObj, retryCount + 1);
      }
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isPending) return; // Prevent double submission
    
    setIsPending(true);
    setErrors({});
    setRetryCount(0);

    try {
      // Pre-submission validation
      if (!formData.pitch || formData.pitch.trim().length < 10) {
        throw new Error('Pitch must be at least 10 characters long');
      }

      // Validate form data
      await validateFormData(formData);

      // Create FormData object from state
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        // Only trim when adding to FormData for submission
        formDataObj.append(key, value.trim());
      });

      // Submit to server action with retry logic
      const result = await retrySubmission(formDataObj, 0);

      if (result.status === "SUCCESS") {
        toast({
          title: "Success",
          description: "Your startup pitch has been created successfully",
        });
        
        // Clear form data before navigation
        setFormData({
          title: "",
          description: "",
          category: "",
          link: "",
          pitch: "",
        });
        
        router.push(`/startup/${result._id}`);
      } else {
        throw new Error(result.error || "Failed to create pitch");
      }
    } catch (error) {
      console.error('Form submission error:', error);

      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);

        toast({
          title: "Validation Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "An unexpected error occurred",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="startup-form"
      autoComplete="off"
    >
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className="startup-form_input"
          required
          minLength={3}
          maxLength={100}
          placeholder="Startup Title"
          disabled={isPending}
        />
        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="startup-form_textarea"
          required
          minLength={10}
          maxLength={500}
          placeholder="Startup Description"
          disabled={isPending}
        />
        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="startup-form_input"
          required
          minLength={2}
          maxLength={50}
          placeholder="Startup Category (Tech, Health, Education...)"
          disabled={isPending}
        />
        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          type="url"
          value={formData.link}
          onChange={handleInputChange}
          className="startup-form_input"
          required
          pattern="https://.*"
          placeholder="https://example.com/image.jpg"
          disabled={isPending}
        />
        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={formData.pitch}
          onChange={handlePitchChange}
          name="pitch"
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder: "Briefly describe your idea and what problem it solves",
            disabled: isPending,
          }}
          previewOptions={{
            disallowedElements: ["style", "script"],
          }}
        />
        {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? (
          <>
            {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : "Submitting..."}
            <Send className="size-6 ml-2 opacity-50" />
          </>
        ) : (
          <>
            Submit Your Pitch
            <Send className="size-6 ml-2" />
          </>
        )}
      </Button>
    </form>
  );
};

export default StartupForm;
