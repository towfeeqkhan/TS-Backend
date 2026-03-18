import express, { Request, Response } from "express";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is live");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
