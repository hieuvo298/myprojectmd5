import * as dotenv from "dotenv";
import express, { urlencoded } from "express";
import sequelize from "./configs/db.config";
import createTable from "./entities";
import myRouter from "./routers";
import session from "express-session";
import bodyParser from "body-parser";
const cors = require("cors");
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(bodyParser.json());
app.use(urlencoded());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(
  session({
    secret: String(process.env.secretKey),
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
sequelize.authenticate();
createTable();

myRouter(app);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
