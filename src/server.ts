import express, { Request, Response } from "express";
import todoRoutes from "./routes/todo.routes.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";

await connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("API is live");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
