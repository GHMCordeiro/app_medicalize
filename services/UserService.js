import mongoose from "mongoose";
import user from '../models/User.js'

const users = mongoose.model("User", user)

class User {
    Cad(name, email, password) {
        const newUser = new users({
            name: name,
            email: email,
            password: password
        })

        newUser.save()

        return newUser
    }

    Login(email, password) {
        const ver = users.findOne({ email: email, password: password })
        return ver
    }

    Verify(email) {
        const data = users.findOne({email: email})
        return data
    }

    Fav(id, data) {
        const res = users.findByIdAndUpdate(id, {
            $push: {
                favMed: {
                    id: data._id,
                    nome: data.nome,
                    preco: data.preco,
                    tipo: data.tipo,
                    concentracao: data.concentracao,
                    qtd: data.qtd
                }
            }
        })

        return res
    }

    DesFav(idUser, med) {
        const res = users.findByIdAndUpdate(idUser, { $pull: { favMed: { _id: med } } })
        return res
    }

    FindById(id) {
        const data = users.findById(id)
        return data
    }
}

export default new User