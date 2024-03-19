import express from "express";
import env from "dotenv";
import cors from "cors";
import DB_Init from "./Entities/DbInit.js";
import createDbRouter from "./Routes/CreateDbRoute.js";
import categoriesRouter from "./Routes/CategoriesRouter.js";
import messagesChatRouter from "./Routes/MessagesChatRouter.js";
import orderItemsRouter from "./Routes/OrderItemsRouter.js";
import ordersRouter from "./Routes/OrdersRouter.js";
import reviewsRouter from "./Routes/ReviewsRouter.js";
import servicesRouter from "./Routes/ServicesRouter.js";

env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

DB_Init();
app.use("/api", createDbRouter);
app.use("/api", categoriesRouter);
app.use("/api", messagesChatRouter);
app.use("/api", orderItemsRouter);
app.use("/api", ordersRouter);
app.use("/api", reviewsRouter);
app.use("/api", servicesRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log("API is runnning at " + port);
