import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        // Try GET request instead of HEAD
        const res = await fetch(url);
        const contentType = res.headers.get("content-type");
        
        // More permissive image type checking
        return contentType?.includes("image") || 
               url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
      } catch {
        // If fetch fails, fall back to URL pattern matching
        return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;
      }
    }, "Please provide a valid image URL"),
  pitch: z.string().min(10),
});
