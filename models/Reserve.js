import mongoose from "mongoose";

const reserve = new mongoose.Schema({
    idUser: {
        type: String
    },
    med: {
        id: {
            type: String
        },
        name: {
            type: String
        },
        tipo: {
            type: String
        },
        concentracao: {
            type: String
        }
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    prescricao: {
        type: String
    },
    price: {
        type: Number
    },
    retirada:{
        type: String,
        default: '17:00'
    },
    farm:
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
        }
    }

})

export default reserve