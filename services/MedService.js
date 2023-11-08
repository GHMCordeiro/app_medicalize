import mongoose from "mongoose";
import med from '../models/Med.js'

const Med = mongoose.model('medicamentos', med);

class Meds {
    async Cad(data, imagem) {
        const cad = new Med({
            nome: data.nome,
            tipo: data.tipo,
            concentracao: data.concentracao,
            qtd: data.qtd,
            image: imagem,
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

        try {
            // Aguarde a conclusão da operação de salvamento
            await cad.save();
            return cad;
        } catch (error) {
            // Lide com erros, se houver algum
            throw error;
        }
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

    FindByIdAndAdd(id, data, estoque, preco) {
        const res = Med.findByIdAndUpdate(id, {
            $push: {
                farms: {
                    id: data._id,
                    name: data.name,
                    address: data.address,
                    localization: {
                        latitude: data.localization.latitude,
                        longitude: data.localization.longitude
                    },
                    phone: data.phone,
                    estoque: estoque,
                    preco: preco
                }
            }
        })

        return res
    }

    FindByIdAndRemove(id, farm) {
        const res = Med.findByIdAndUpdate(id, { $pull: { farms: { id: farm } } })
        return res
    }

    FavUser(idMed, idUser) {
        const res = Med.findByIdAndUpdate(idMed, { $push: { favUser: { id: idUser } } })
        return res
    }

    DesFavUser(idMed, idUser) {
        const res = Med.findByIdAndUpdate(idMed, { $pull: { favUser: { id: idUser } } })
        return res
    }

}

export default new Meds