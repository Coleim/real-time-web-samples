const express = require('express')
const app = express()
const port = 3000

let data = []

app.use(express.json());




app.get('/poll', (req, res) => {
    function checkForNewData() {
        console.log("checkForNewData: " , data)
        if (data.length > 0) {
            res.json({ data })
            data = []
        } else {
            // If no new data, continue polling after a short delay
            console.log("No new data, checking again in 1 second")
            setTimeout(checkForNewData, 1000);  // Check again after 1 seconds
        }
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