import { Document } from "mongoose"

export interface InterfaceTodo extends Document {
    name: string
    completed: boolean
  }