import express from 'express'
import mqtt from './mqtt'

const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
	res.render('pages/index')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})