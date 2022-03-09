import express from "express";
import { mqttClient, receiveTopic, sendTopic } from "./mqtt.js";
import client from "knex";

const app = express();
const port = 3000;

export const knex = client({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "secret",
    database: "project2",
  },
  migrations: {
    tableName: "migrations",
  },
});

// Write migration
// console.log(await knex("data").select(["GPIO", "temperature"]))

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/polling", async (req, res) => {
  const lights = await knex
    .select()
    .table("light")
    .limit(100)
    .orderBy("id", "desc");
  const mode = await knex.select.table("mode").limit(1).orderBy("id", "desc");
  return res.json({ lights: lights, mode: mode });
});

app.post("/up", (req, res) => {
  mqttClient.publish(sendTopic, "1");
});

app.post("/down", (req, res) => {
  mqttClient.publish(sendTopic, "2");
});

app.post("/left", (req, res) => {
  mqttClient.publish(sendTopic, "3");
});

app.post("/right", (req, res) => {
  mqttClient.publish(sendTopic, "4");
});

app.post("/stop", (req, res) => {
  mqttClient.publish(receiveTopic, "0");
});

// app.post("/angle", (req, res) => {
//   const { vertical, horizontal } = req.body;
//   mqttClient.publish(receiveTopic, "3_" + vertical + "_" + horizontal);
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
