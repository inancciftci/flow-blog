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

export const CreateCategorySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(20, "Description must be at least 10 characters long"),
  coverImage: z
    .instanceof(File)
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image should be less than 5MB",
    }),
});

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignUpSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const UpdateImageAndNameSchema = z.object({
  avatarUrl: z
    .instanceof(File)
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
      message: "Image should be less than 5MB",
    })
    .optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const UpdateBioSchema = z.object({
  bio: z.string().min(30, "Bio must be at least 2 characters long"),
});

export const CommentSchema = z.object({
  comment: z.string().min(10, "Comment must be at least 10 characters long"),
});
