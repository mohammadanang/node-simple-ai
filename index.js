const express = require("express")
const app = express()
const brain = require("brain.js")
const data = require("./data.json")

const network = new brain.recurrent.LSTM()

const trainingData = data.map(item => ({
    input: item.text,
    output: item.category
}))

network.train(trainingData, {
    iterations: 2000
})

app.get("/", (req, res) => {
    let value = req.query.text
    let output = "Welcome to simple AI nodejs"

    if(value)
        output = network.run(value)

    return res.send({
        result: output
    })
})

app.listen(3000, () => {
    console.log(`Running on 3000`)
})
