const express = require('express');
const app = express();
const mongoose = require('mongoose');
const lugaresSchema = require("../models/lugaresAtencion");

const LugaresModel = mongoose.models.Lugares || mongoose.model('Lugares', lugaresSchema);

app.post('/agregarLugar', async (req, res) => {
    try {
        const lugares = new LugaresModel(req.body);
        const data = await lugares.save();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});

app.get('/obtenerLugares', async (req, res) => {
    try {
        const data = await lugaresSchema.find({});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});

app.delete('/eliminarLugares/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const data = await lugaresSchema.deleteOne({_id: id});
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});


    


module.exports = app;