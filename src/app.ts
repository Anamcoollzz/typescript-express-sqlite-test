import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import AdministratorController from "./controllers/AdministratorController";
import sequelize from "./models/connection";
import swaggerUi, { JsonObject } from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";
import userSeeder from "./seeds/user-seeder";
import adminRouter from "./routes/AdminRoute";
import customerRouter from "./routes/CustomerRoute";
// import swaggerJSDoc from "swagger-jsdoc";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

userSeeder();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});
app.get("/check-connection", async (req: Request, res: Response) => {
  try {
    await sequelize.authenticate();
    userSeeder();
    res.json({ message: "Connection has been established successfully." });
  } catch (error) {
    res.json({ message: "Unable to connect to the database:" + error });
  }
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(adminRouter);
app.use(customerRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
