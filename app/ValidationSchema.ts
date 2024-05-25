import { z } from "zod";
import { Category, Status, Term, Type } from "@prisma/client";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required.").max(255),
  // user change or use default value
  category: z.nativeEnum(Category),
  job_title: z.string().min(1, "Job Title is required.").max(65535),
  job_info: z.string().max(65535).optional(),
  track_link: z.string().max(65535).optional(),
  position_code: z.string().max(255).optional(),
  // user change or use default value
  type: z.nativeEnum(Type),
  // user change or use default value
  term: z.nativeEnum(Term),
  // user change or use default value
  year: z.number().int().min(1900).max(2100),
  location: z.string().min(1, "Location is required.").max(255),
});

export const updateApplicationSchema = applicationSchema.extend({
  status: z.nativeEnum(Status),
}).partial();