import mongoose from "mongoose"


const med = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    concentracao: {
        type: String,
        required: true
    },
    qtd: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'generico.jpg'
    },
    bula: {
        serve: {
            type: String,
            required: true
        },
        nao_usar: {
            type: String,
            required: true
        },
        armazenar: {
            type: String,
            required: true
        },
        como_funciona: {
            type: String,
            required: true
        },
        saber_antes: {
            type: String,
            required: true
        },
        reacoes: {
            type: String,
            required: true
        },
        utilizar: {
            type: String,
            required: true
        }
    },
    farms: [
        {
            id: {
                type: String
            },
            name: {
                type: String
            },
            address: {
                type: String
            },
            localization: {
                latitude: {
                    type: String
                },
                longitude: {
                    type: String
                }
            },
            phone: {
                type: String
            },
            estoque: {
                type: Number
            },
            preco: {
                type: Number
            }
        }
    ],
    favUser: [
        {
            id: {
                type: String
            }
        }

    ]
})

export default med
