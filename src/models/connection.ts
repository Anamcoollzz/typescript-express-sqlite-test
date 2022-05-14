import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databases/app.sqlite",
});

export default sequelize;
