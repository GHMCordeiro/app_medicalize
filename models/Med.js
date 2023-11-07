import mongoose from "mongoose"


const med = new mongoose.Schema({
    nome:{
        type:String,
        required:true
    },
    preco:{
        type:Number,
        default: 0.0,
        required:true
    },
    tipo:{
        type: String,
        required:true
    },
    concentracao:{
        type: String,
        required:true
    },
    qtd:{
        type: String,
        required: true
    },
    bula:{
        serve:{
            type: String,
            required: true
        },
        nao_usar:{
            type: String,
            required: true
        },
        armazenar:{
            type: String,
            required: true
        },
        como_funciona:{
            type: String,
            required: true
        },
        saber_antes:{
            type: String,
            required: true
        },
        reacoes:{
            type: String,
            required: true
        },
        utilizar:{
            type: String,
            required: true
        }
    }
})

export default med
