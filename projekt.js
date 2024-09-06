const express = require('express')
const fs = require("fs")
const server = express()
server.use(express.static("client"))
server.use(express.urlencoded('public'))

server.post("/data", (req, res) => {
    console.log("req.body")
    fs.writeFileSync("Hej.json", JSON.stringify(req.body))
    res.sendFile(__dirname + '/client/login.html')

})
server.post("/login", (req, res) => {
    console.log(req.body.Username, "Från login")
    const file = JSON.parse(fs.readFileSync("Hej.json", { encoding: 'utf-8' }))
    console.log(file.Username, "från fil")
    if (req.body.Username == file.Username && req.body.Password == file.Password) {
        res.sendFile(__dirname + '/client/home.html')
        console.log("Rätt!")
    } else {
        console.log("Fel")
    }

})

server.get("/read", (req, res) => {
    const file = JSON.stringify(fs.readFileSync("Hej.json", { encoding: 'utf-8' }))
    res.send(file)
})

server.listen(3000, () => {
    console.log("Server is up and running")
})
