//import express from express module. framework to create our api with nodejs and serve frontent
//cors, a library allowing us to setup rules for communication bw frontend and backend. eases making api request
//MongoDB makes it easy to store structured or unstructured data. It uses a JSON-like format to store documents.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";

//instantiate express
const app = express();

dotenv.config();

//generating middlewares
//1.converts data req coming from frontend to json for effective communication
//2.cors eases api communication
app.use(express.json());
app.use(cors());

//set up route/endpt relted to authentication created in routes/user.js 
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);


//generate connection with server
//connection to db
mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
          })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

//port no and callback fn to print whenever api is running
app.listen(8000, () => console.log("SERVER STARTED"));