import express from 'express';
import mqtt from './mqtt.js';
import client from 'knex';

const app = express()
const port = 3000

export const knex = client({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    port : 3306,
    user : 'root',
    password : 'secret',
    database : 'project2'
  },
  migrations: {
    tableName: 'migrations'
  }
})

// Write migration
// console.log(await knex("data").select(["GPIO", "temperature"]))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


app.get('/', (req, res) => {
	res.render('pages/index')
})

app.get('/polling', (req, res) => {
  return res.json({test: "abc"})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
