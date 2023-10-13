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

const showEditForm = async (req, res) => {
    try {
        
        const bicycleId = req.params.id;
        
        const bicycle = await Bicycle.findById(bicycleId);

        if (!bicycle) {
            return res.render("bicycle/index", { error: 'Bicicleta no encontrada' });
        }

        res.render("bicycle/edit_bicycle", { bicycle });

    } catch (error) {
        res.render("bicycle/index", { error: 'Error al editar la bicicleta' });
    }
};

const editBicycle = async (req, res) => {
    try {
        
        const bicycleId = req.body.id;
        
        const bicycle = await Bicycle.findById(bicycleId);

        if (!bicycle) {
            return res.render("bicycle/index", { error: 'Bicicleta no encontrada' });
        }

        bicycle.color = req.body.color;
        bicycle.model = req.body.model;
        bicycle.location.coordinates = [parseFloat(req.body.longitud), parseFloat(req.body.latitud)];

        await bicycle.save();

        //res.redirect(`/bicycle/detail/${bicycleId}`);
        res.redirect("bicycle/index");
        
    } catch (error) {
        res.render("bicycle/index", { error: 'Error al editar la bicicleta' });
    }
};

module.exports = { createBicycle, getAllBicycles, showEditForm, editBicycle };