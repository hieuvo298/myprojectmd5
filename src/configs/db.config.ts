import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "btq6w1wdtycuv9ftwqxy",
  "uwe4rcsmmjuzdmdx",
  "vg9wJZr2a6q8BsLHTTNP",
  {
    host: "btq6w1wdtycuv9ftwqxy-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export default sequelize;
