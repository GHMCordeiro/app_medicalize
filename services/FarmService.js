import mongoose from "mongoose";
import farm from "../models/Farm.js"

const Farm = mongoose.model("Farm", farm)

class Farms {
    Cad(email, password, name, address, latitude, longitude, phone){
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

        newFarm.save()

        return newFarm
    }

    FindById(id){
        const farm = Farm.findById(id)
        return farm
    }
}

export default new Farms