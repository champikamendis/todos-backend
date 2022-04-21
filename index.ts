import express, { Express } from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import routes from "./src/routes";
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoUlr: string = process.env.mongoURL|| "";

// connecting to mongo db
mongoose.connect(mongoUlr)
.then(() => {
    console.log('db connected');
}).catch((error) => {
    console.log("mongoerror", error);
});
// cors issue fixed
app.use((req,res,next)=>{
  res.setHeader("Access-control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS"); 
  next();
});
app.use(bodyParser.json({strict: false}));
// setting main route
app.use("/dev", routes);

// setting port
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});