import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  message: z.string().min(10).max(5000),
});

export const CreatePostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  content: z.string().min(10, "Content should be at least 10 characters long"),
  category: z.string().min(1, "Please select a category"),
  coverImage: z
    .instanceof(File)
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image should be less than 5MB",
    }),
});
