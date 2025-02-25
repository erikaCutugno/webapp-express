const express = require("express");
const moviesRouter = require("./routers/movies");
const errorsHandler = require("./middlewares/errorsHandler");
const routeNotFound = require("./middlewares/routeNotFound");
const cors = require("cors");

const app = express();
const { PORT, FE_URL } = process.env;

app.use(express.json());
app.use(
  cors({
    origin: FE_URL,
  })
);
app.use(express.static("public"));
app.use("/movies", moviesRouter);

app.use(errorsHandler);
app.use(routeNotFound);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
