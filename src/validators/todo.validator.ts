import { z } from "zod";

export const createTodoSchema = z.object({
  title: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Title is required"
          : "Title must be a string",
    })
    .trim()
    .min(1, { error: "Title is required" })
    .min(3, { error: "Title must be at least 3 characters long" }),
});

export const updateTodoSchema = z.object({
  title: z
    .string({ error: "Title must be string" })
    .trim()
    .min(3, { error: "Title must be at least 3 characters long" })
    .optional(),
  completed: z.boolean({ error: "Completed must be a boolean" }).optional(),
});
