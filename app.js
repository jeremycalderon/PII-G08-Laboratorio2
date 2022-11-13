//ABI - POST
const express = require("express")
const mongoose = require("mongoose")
const Cliente = require("./Cliente")

const app = express()

const DB_USER = "laboratorio2"
const DB_PASSWORD = "grupo08"

app.use(express.json())

app.get("/clientes", async (req, res) => {
    try {
        const clientes = await Cliente.find()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

app.post("/clientes", async (req, res) => {
    const { dni, apellidos, nombres, edad } = req.body
    if (!dni || !apellidos || !nombres || !edad) {
        res.status(422).json( { error: "Los datos del cliente están incompletos" } )
        return
    }
    const cliente = {
        dni,
        apellidos,
        nombres,
        edad
    }
    try {
        await Cliente.create(cliente)
        res.status(201).json( { message: "El nuevo cliente ha sido definido"})
    } catch (error) {
        res.status(500).json( { error: error})
    }
    
})

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@laboratorio2.gadvzad.mongodb.net/?retryWrites=true&w=majority`
    ).then(() => {
        console.log("Conectado al MONGODB")
        app.listen(5000, () => {
            console.log("Server on port 5000...")
        })
    })
    .catch((err) => {
        console.log(err)
    })
