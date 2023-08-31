import { Schema, model, models } from "mongoose"
import User from "@models/user"

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
  img: {
    type: String,
    required: [false],
  },
})

const Prompt = models.Prompt || model("Prompt", PromptSchema)

export default Prompt
