import { Request, Response } from "express";
import Todo from "../models/todo.model.js";

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
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
};

// Create Todo
export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;

  const todo = await Todo.create({
    title,
  });

  res.status(201).json(todo);
};

// Update Todo
export const updateTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, completed } = req.body;

  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { title, completed },
    { returnDocument: "after", runValidators: true },
  );

  if (!updatedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(updatedTodo);
};

// Delete Todo
export const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json({ message: "Todo deleted successfully" });
};
