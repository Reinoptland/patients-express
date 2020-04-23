// import express
const express = require("express");
const patients = require("./patients");

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
  const names = patients.map((patient) => {
    return `<li><a href="/patients/${patient.id}">${patient.firstName} ${patient.lastName}</a></li>`;
  });
  console.log(names);

  // turn array of strings into 1 string using .join(" ")
  const patientList = names.join(" ");
  response.send(patientList);
});

app.get("/patients/:id", (request, response) => {
  console.log("ID IS:", request.params.id);
  const patientId = parseInt(request.params.id);
  const patient = patients.find((patient) => {
    console.log(patient.id, patientId, patient.id === patientId);
    return patient.id === patientId;
  });

  if (patient === undefined) {
    return response.send("Sorry, no patient with this id");
  }

  const { email, phoneNumber, firstName, lastName } = patient;

  const color = patient.gender === "m" ? "blue" : "pink";

  const html = `<html>
    <style>
        h5 {
            color: ${color};
        }
    </style>
    <h5> ${firstName} ${lastName}</h5>
    <p>Phone: ${phoneNumber} </p>
    <p>Email: ${email} </p>
  </html>`;

  response.send(html);
});
