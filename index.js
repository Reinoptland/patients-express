// import express
const express = require("express");

// create server
const app = express();

// 3000 is common
const port = 3000;

// confirmation function
function onListen() {
  console.log(`Listening on :${port}`);
}

// start listening
app.listen(
  port, // TCP port where the server listens
  onListen // callback runs when server starts
);

app.get("/patients", (request, response) => {
  response.send("hello");
});
