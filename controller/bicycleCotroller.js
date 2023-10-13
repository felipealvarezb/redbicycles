const Bicycle = require('../models/Bicycle');

const createBicycle = async (req, res) => {
    try {

        const { color, model, latitud, longitud } = req.body;

        const nuevaBicicleta = new Bicycle({
            color,
            model,
            location: {
                type: 'Point',
                coordinates: [parseFloat(longitud), parseFloat(latitud)],
            },
        });

        await nuevaBicicleta.save();

        res.redirect("/bicycle/");

    } catch (error) {
        res.render("/bicycle/index", { error: 'Error al agregar la bicicleta' });
    }
};

const getAllBicycles = async (req, res) => {
    try {
        const bicycles = await Bicycle.find();

        res.render("bicycle/index", { bicycles });

    } catch (error) {
        res.render("/bicycle/", { error: 'Error al obtener las bicicletas' });
    }
};

const editBicycle = async (req, res) => {
    try {

        const bicycleId = req.params.id;

        if (!bicycleId) {
            return res.render("bicycle/index", { error: 'ID de bicicleta no proporcionado' });
        }

        const bicycle = await Bicycle.findById(bicycleId);

        if (!bicycle) {
            return res.render("bicycle/index", { error: 'Bicicleta no encontrada' });
        }
        if (req.method === 'GET') {
            res.render("bicycle/edit_bicycle", { bicycle });
        } else if (req.method === 'POST') {
            bicycle.color = req.body.color;
            bicycle.model = req.body.model;
            bicycle.location.coordinates = [parseFloat(req.body.longitud), parseFloat(req.body.latitud)];

            await bicycle.save();

            //res.redirect(`/bicycle/detail/${bicycleId}`);
            res.redirect("bicycle/index");
        }
    } catch (error) {
        res.render("bicycle/index", { error: 'Error al editar la bicicleta' });
    }
};

module.exports = { createBicycle, getAllBicycles, editBicycle };