import { Request, Response } from "express";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [
  {
    id: 1,
    title: "Gym",
    completed: false,
  },
];

// Get all todos
export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

// Get single todo
export const getTodoById = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
};

// Create Todo
export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;

  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };

  todos.push(newTodo);

  res.status(201).json(newTodo);
};

// Update Todo
export const updateTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
};

// Delete Todo

export const deleteTodo = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  const deleted = todos.splice(index, 1);

  res.json({ message: "Todo deleted", todo: deleted[0] });
};
