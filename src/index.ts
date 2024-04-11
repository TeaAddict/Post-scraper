import "dotenv/config";
import http from "http";
import express from "express";
import router from "./router/index.js";
import bodyParser, { json } from "body-parser";

const app = express();

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on: http://localhost:${process.env.PORT}`);
});

app.use(bodyParser.json());
// app.use(json());
app.use(router());
