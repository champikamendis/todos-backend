import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import config from "../config/config";
import { InterfaceTodo } from "../interfaces/todo.interface";
import TODO from "../model/todo.model";

class TodoController {

  static fetchMyTodos = async (req: Request, res: Response) => {
    let { name, completed, ownerId } = req.body;
    //get user id from the token
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token.split(" ")[1], config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    const { userId } = jwtPayload;
    try {
      const todo = await TODO.find({ownerId: userId});
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo adding failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };

  static addTodo = async (req: Request, res: Response) => {
    let { name, completed, ownerId } = req.body;
    //get user id from the token
    const token = <string>req.headers["authorization"];
    let jwtPayload;
    try {
      jwtPayload = <any>jwt.verify(token.split(" ")[1], config.jwtSecret);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }
    const { userId } = jwtPayload;
    try {
      const newTODO: InterfaceTodo = new TODO({
        name,
        completed,
        ownerId: userId,
      });
      const todo = await newTODO.save();
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo adding failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };

  static updateTodo = async (req: Request, res: Response) => {
    let { name, completed, _id } = req.body;
    try {
      const newTODO: InterfaceTodo = new TODO({
        _id,
        name,
        completed,
      });
      const todo = await TODO.updateOne({_id}, newTODO);
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo update failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };

  static deleteTodo = async (req: Request, res: Response) => {
    try {
      let { id } = req.params;
      const todo = await TODO.deleteOne({ _id: id });
      if (todo) {
        return res.status(200).send(todo);
      } else {
        return res.status(401).send({ message: "Todo delete failed" });
      }
    } catch (error) {
      return res.status(401).send({ message: error });
    }
  };
}

export default TodoController;
