import mongoose from "mongoose";
import farm from "../models/Farm.js"

const Farm = mongoose.model("Farm", farm)

class Farms {
    async Cad(email, password, name, address, latitude, longitude, phone) {
        const newFarm = new Farm({
            email: email,
            password: password,
            name: name,
            address: address,
            localization: {
                latitude: latitude,
                longitude: longitude
            },
            phone: phone
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
}

export default new Farms