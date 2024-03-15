import express from "express";
import env from "dotenv";
import cors from "cors";
//import DB_Init from "./Entities/DbInit.js";
// import createDbRouter from "./Routes/CreateDbRoute.js";
// import userRouter from "./Routes/UserRouter.js";
// import projectRouter from "./Routes/ProjectsRouter.js";
// import userProjectRouter from "./Routes/UserProjectRoute.js";
// import permissionRouter from "./Routes/PermissionRoute.js";
// import gradeRouter from "./Routes/GradeRoute.js";
// import deliverableRouter from "./Routes/DeliverablesRoute.js";

env.config();

let app = express();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// DB_Init();

// app.use("/api", createDbRouter);
// app.use("/api", userRouter);
// app.use("/api", projectRouter);
// app.use("/api", userProjectRouter);
// app.use("/api", permissionRouter);
// app.use("/api", gradeRouter);
// app.use("/api", deliverableRouter);

let port = process.env.PORT || 8001;
app.listen(port);
console.log("API is runnning at " + port);
