import express from "express";
import { mqttClient, receiveTopic, sendTopic } from "./mqtt.js";
import client from "knex";
import cors from "cors"

const app = express();
const port = 3000;

export const knex = client({
  client: "mysql",
  connection: {
    host: "localhost",
    port: 3306,
    user: "tan",
    password: "Trannhattan14102000@",
    database: "doan2",
  },
  migrations: {
    tableName: "migrations",
  },
});

// Write migration
// console.log(await knex("data").select(["GPIO", "temperature"]))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/polling", async (req, res) => {
  const lights = await knex
    .select()
    .table("light")
    .limit(100)
    .orderBy("id", "desc");
  const mode = await knex.select().table("mode").limit(1).orderBy("id", "desc");
  return res.json({ lights: lights, mode: mode });
});

app.post("/up", (req, res) => {
  mqttClient.publish(sendTopic, "1");
  return res.json({ result: "OK" });
});

app.post("/down", (req, res) => {
  mqttClient.publish(sendTopic, "2");
  return res.json({ result: "OK" });
});

app.post("/left", (req, res) => {
  mqttClient.publish(sendTopic, "3");
  return res.json({ result: "OK" });
});

app.post("/right", (req, res) => {
  mqttClient.publish(sendTopic, "4");
  return res.json({ result: "OK" });
});

app.post("/stop", (req, res) => {
  mqttClient.publish(sendTopic, "5");
  return res.json({ result: "OK" });
});

app.post("/out", (req, res) => {
  mqttClient.publish(sendTopic, "0");
  return res.json({ result: "OK" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// export const knex = client({
//   client: "mysql",
//   connection: {
//     host: "localhost",
//     port: 3306,
//     user: "tan",
//     password: "Trannhattan14102000@",
//     database: "doan2",
//   },
//   migrations: {
//     tableName: "migrations",
//   },
// });