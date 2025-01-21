const express = require('express')
const app = express()
const port = 3000

let data = []

app.use(express.json());


app.get('/poll', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Transfer-Encoding', 'chunked');

    function checkForNewData() {
        console.log("checkForNewData: " , data)
        if (data.length > 0) {
            res.write(JSON.stringify({ data }))
            data = []
        }
        setTimeout(checkForNewData, 100);
    }
    // Start checking for new data
    checkForNewData();
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