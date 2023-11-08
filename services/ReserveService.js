import mongoose from "mongoose";
import reserve from '../models/Reserve.js'

const Reserve = mongoose.model("Reserve", reserve)

class Reserves {
    async Cad(data, farm) {
        const newReserve = new Reserve({
            idUser: data.idUser,
            idMed: {
                id: data.med.id,
                name: data.med.name,
                tipo: data.med.tipo,
                concentracao: data.med.concentracao
            },
            name: data.name,
            phone: data.phone,
            prescricao: data.prescricao,
            price: data.price,
            farm: {
                id: farm.id,
                name: farm.name,
                address: farm.address,
                localization: {
                    latitude: farm.localization.latitude,
                    longitude: farm.localization.longitude
                },
                phone: farm.phone
            }
        })

        try {
            await newReserve.save();
            return newReserve;
        } catch (error) {
            throw error;
        }
    }
}

export default new Reserves