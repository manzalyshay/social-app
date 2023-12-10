import express from "express";

const app = express();

app.get("*", (req, res) => {
  console.log("ss");
  var ss = "shay";
  res.status(200).send({});
});

export default app;
