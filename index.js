const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { userInfo } = require("os")


const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/myDataFeed', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log("DB connected");
})

const dataSchema = mongoose.Schema({
    type: String,
    year: Number,
    capacity: Number,
    production: Number,
    capacityU: Number,
    imports: Number,
    exports: Number,
})

const Data = new mongoose.model("Data", dataSchema)

//Routes

app.post("/feed", (req, res) => {
    const { capacity, production, capacityU, imports, exports, type, year } = req.body
    const data = new Data({
        type,
        year,
        capacity,
        production,
        capacityU,
        imports,
        exports,
    })
    data.save(err => {

        if (err) {
            res.send(err)
        } else {
            res.send({ message: "success" })
        }

    })

})

app.get("/api", (req, res) => {

    Data.find({})
        .then((data) => {
            console.log('Data', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error:', daerrorta)
        });


})


app.listen(9004, () => {
    console.log("backend Started at port 9004");
})




// const companySchema = new mongoose.Schema({
//     capacity: String,
//     production: String,
//     capacityU: String,
//     imports: String,
//     exports: String,
// })

// const User = new mongoose.model("User", companySchema)

// app.post("/feed", (req, res) => {
//     const { capacity, production, capacityU, imports, exports } = req.body

//     const user = new User({
//         capacity,
//         production,
//         capacityU,
//         imports,
//         exports,
//     })

//     user.save(err => {
//         if (err) {
//             res.send(err)
//         } else {
//             res.send({ message: "Data feeded Successfully" })
//         }

//     })

//     app.listen(9004, () => {

//         console.log("Backed Started at port {http://localhost:9004}")
//     })

// })