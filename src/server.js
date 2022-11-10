const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const db = require("./db/db");
const logger = require("./middleware/logger");

app.use(express.json());
app.use(logger);

app.use("/user", userRouter);

app.listen(5001, async () => {
  await db.sync();
});
