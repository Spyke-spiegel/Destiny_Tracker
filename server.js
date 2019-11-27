const express = require("express");
const morgan = require("morgan");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

const port = process.env.PORT || 8000;

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});

app.use("/api/v1/search", require("./routes/Search"));
app.use("/api/v1/profile", require("./routes/Profile"));

// app.get("/api/v1/profile/:gamertag", (req, res) => {
//   console.log(req.params.gamertag);
//   res.send("hello world");
// });
