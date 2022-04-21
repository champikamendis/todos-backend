import { Router, Request, Response } from "express";
import user from "./user.route";
import todo from './todo.route';

const routes = Router();

routes.use("/auth", user);
routes.use("/todo", todo);

export default routes;