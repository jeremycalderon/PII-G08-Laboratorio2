const mongoose = require("mongoose")

const Cliente = mongoose.model("Cliente", {
    dni: String,
    apellidos: String,
    nombres: String,
    edad: Number,
})

module.exports = Cliente