import { Router } from "express";
import TodoController from "../controllers/todo.controller";
import { checkJwt } from "../jwt_middleware/jwt";

const router = Router();
// get my Todo
router.get("/fetchMyTodos", [checkJwt], TodoController.fetchMyTodos);

// addTodo
router.post("/add", [checkJwt], TodoController.addTodo);

//editTodo
router.put("/edit", [checkJwt], TodoController.updateTodo);

//deleteTodo
router.delete("/delete/:id", [checkJwt], TodoController.deleteTodo);

export default router;