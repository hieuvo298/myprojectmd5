import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  "bolnqg7gi4neaymbfrao",
  "ulwfspvnpvpxmbsf",
  "Wn2yJTDoUXLaiCJibdHF",
  {
    host: "bolnqg7gi4neaymbfrao-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

export default sequelize;
