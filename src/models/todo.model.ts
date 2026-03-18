import mongoose, { InferSchemaType } from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

type TodoTypes = InferSchemaType<typeof todoSchema>;

const Todo = mongoose.model<TodoTypes>("Todo", todoSchema);

export default Todo;
