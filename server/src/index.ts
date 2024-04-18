import "dotenv/config";
import http from "http";
import express from "express";
import router from "./router/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}`);
});

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(router());
