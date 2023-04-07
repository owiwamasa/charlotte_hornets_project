import express from "express";
import cors from "cors";
// import dotenv from "dotenv";
import bodyParser from "body-parser";

// dotenv.config();

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
// app.use("/players", playerRouter);
// app.use("/shots", shotRouter);
// app.use("/lineupComparison", lineupComparisonRouter);

app.listen(port, () => console.log(`Running on port ${port}`));

app.get("/", (req, res) => {
  res.send("It is working!!!!");
});
