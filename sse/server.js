const express = require('express')
const app = express()
const port = 3000

let data = []

app.use(express.json());


app.get('/poll', (req, res) => {
  console.log("Hello popoll ")

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  let intervalID = setInterval(() => {
    if (data.length > 0) {
      console.log("interval with data ")
      res.write(`data: ${JSON.stringify(data)} \n\n`)
      data = []
    }
  }, 100)

  res.on('close', () => {
    console.log("close connection")
    clearInterval(intervalID)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/feed', (req, res) => {
  console.log('Data received: ', req.body)
  data.push(req.body.value)
  res.json({ status: 'OK' })
})


// serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
