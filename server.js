const express = require("express")
const fs = require("fs/promises")

const app = express()

function readAllData() {
    return fs.readFile("data.json", "utf-8")
    .then((data) => JSON.parse(data.toString()))
}

app.get("/users",(req,res) =>{
    // res.send("hello Biro")
    readAllData()
    .then((data)=> res.send(data))
    // .then(function(data){
    //     res.send(data)
    // })

})

app.post("/users",(req,res) => {
    const newUser = req.body
    console.log("--new user--", JSON.stringify(newUser))

    return readAllData()
    // fs.writeFile("data.json", JSON.stringify(newUser))
    .then ((data) => {
    data.push(newUser)
    console.log(data)
    return fs.writeFile("data.json", JSON.stringify(data))
    
})
.then(() => {
    res.send("user created successfully")
})
.catch((error) => {
    res.send("user not created")
})
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})

