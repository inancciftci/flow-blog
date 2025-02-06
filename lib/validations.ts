import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  message: z.string().min(10).max(5000),
});
