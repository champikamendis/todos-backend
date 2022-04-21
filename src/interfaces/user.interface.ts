import { Document } from "mongoose"

export interface InterfaceUser extends Document {
    username: string
    password: string
  }