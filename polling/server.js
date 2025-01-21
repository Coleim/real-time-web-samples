const express = require('express')
const app = express()
const port = 3000

let data = []

app.use(express.json());

app.get('/poll', (req, res) => {
    res.json({ data })
    data = []
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/feed', (req, res) => {
    data.push(req.body.value)
    res.json({ status: 'OK' })
})


// serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})