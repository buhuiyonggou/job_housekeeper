import { z } from "zod";
import { Category, Status, Term, Type } from "@prisma/client";

export const applicationSchema = z.object({
  company: z.string().min(1, "Company is required.").max(255),
  category: z.nativeEnum(Category),
  job_title: z.string().min(1, "Job Title is required.").max(65535),
  job_info: z.string().min(1, "Job Info is required.").max(65535).optional(),
  track_link: z.string().max(65535).optional(),
  position_code: z.string().max(255).optional(),
  type: z.nativeEnum(Type),
  term: z.nativeEnum(Term),
  year: z.number().min(1, "Year is required."),
  location: z.string().min(1, "Location is required.").max(255),
});

export const patchApplicationSchema = applicationSchema.extend({
  status: z.nativeEnum(Status),
  assignedToUserId: z.string().min(1).max(255).optional().nullable(),
});