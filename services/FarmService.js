import mongoose from "mongoose";
import farm from "../models/Farm.js"

const Farm = mongoose.model("Farm", farm)

class Farms {
    async Cad(email, password, name, address, latitude, longitude, phone, descarte) {
        const newFarm = new Farm({
            email: email,
            password: password,
            name: name,
            address: address,
            localization: {
                latitude: latitude,
                longitude: longitude
            },
            phone: phone,
            descarte: descarte
        })

        try {
            // Aguarde a conclusão da operação de salvamento
            await newFarm.save();
            return newFarm;
        } catch (error) {
            // Lide com erros, se houver algum
            throw error;
        }
    }

    FindById(id) {
        const farm = Farm.findById(id)
        return farm
    }

    GetAll(){
        const res = Farm.find()
        return res
    }
}

export default new Farms