import { Request, Response } from "express";
import Todo from "../models/todo.model.js";
import AppError from "../utils/AppError.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validators/todo.validator.js";
import { z } from "zod";
import { formatZodError } from "../utils/formatZodError.js";

// Get all todos
export const getTodos = async (req: Request, res: Response) => {
  const todos = await Todo.find();
  res.json(todos);
};

// Get single todo
export const getTodoById = async (req: Request, res: Response) => {
  const id = req.params.id;

  const todo = await Todo.findById(id);

  if (!todo) {
    throw new AppError("Todo not found", 404);
  }

  res.json(todo);
};

// Create Todo
export const createTodo = async (req: Request, res: Response) => {
  const validation = createTodoSchema.safeParse(req.body);

  if (!validation.success) {
    console.log(z.prettifyError(validation.error));

    return res.status(400).json({
      message: "Validation failed",
      errors: formatZodError(validation.error),
    });
  }

  const { title } = validation.data;

  const todo = await Todo.create({
    title,
  });

  res.status(201).json(todo);
};

// Update Todo
export const updateTodo = async (req: Request, res: Response) => {
  const validation = updateTodoSchema.safeParse(req.body);

  if (!validation.success) {
    console.log(z.prettifyError(validation.error));

    return res.status(400).json({
      message: "Validation failed",
      errors: formatZodError(validation.error),
    });
  }

  const id = req.params.id;
  const { title, completed } = validation.data;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { title, completed },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedTodo) {
    throw new AppError("Todo not found", 404);
  }

  res.json(updatedTodo);
};

// Delete Todo
export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    throw new AppError("Todo not found", 404);
  }

  res.json({ message: "Todo deleted successfully" });
};
