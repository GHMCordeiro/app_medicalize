import mongoose from "mongoose";
import med from '../models/Med.js'

const Med = mongoose.model('medicamentos', med);

class Meds {
    Cad(data) {
        const cad = new Med({
            nome: data.nome,
            preco: data.preco,
            tipo: data.tipo,
            concentracao: data.concentracao,
            qtd: data.qtd,
            bula: {
                serve: data.serve,
                nao_usar: data.nao_usar,
                armazenar: data.armazenar,
                como_funciona: data.como_funciona,
                saber_antes: data.saber_antes,
                reacoes: data.reacoes,
                utilizar: data.utilizar
            }
        })
    }

    GetAll() {
        const meds = Med.find()
        return meds
    }

    FindById(id) {
        const data = Med.findById(id)
        return data
    }

    Search(nome) {
        var aux = new RegExp(nome, 'i')
        const data = Med.find({ nome: aux })
        return data
    }
}

export default new Meds