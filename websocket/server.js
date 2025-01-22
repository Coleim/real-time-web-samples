const express = require('express')
const WebSocket = require('ws')

const app = express()
const port = 3000

let data = []

app.use(express.json());

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const wss = new WebSocket.Server({ server })
wss.on('connection', (ws) => {
  console.log("New client connected")

  let intervalID = setInterval(() => {
    if (data.length > 0) {
      console.log("interval with data ")
      ws.send(JSON.stringify(data))
      data = []
    }
  }, 200)
  // send data to the client periodically

  ws.on('close', () => {
    console.log('A client disconnected');
    clearInterval(intervalID)
  });

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
