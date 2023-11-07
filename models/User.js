import mongoose from "mongoose"


const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favMed: [
        {
            id: {
                type: String
            },
            nome: {
                type: String,
            },
            preco: {
                type: Number,
                default: 0.0,
            },
            tipo: {
                type: String,
            },
            concentracao: {
                type: String,
            },
            qtd: {
                type: String,
            }
        }
    ]
})

export default user