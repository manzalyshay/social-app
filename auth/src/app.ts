import express from "express";

const app = express();

app.get("*", (req, res) => {
  console.log("ss");
  res.status(200).send({});
});

export { app };
