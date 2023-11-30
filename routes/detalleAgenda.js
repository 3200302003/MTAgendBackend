const express = require('express');
const app = express();
const horariosSchema = require("../models/horarios");
const lugaresSchema = require("../models/lugaresAtencion");

app.get('/detalleCita/:id_lugar/:id_horarios', async(req, res) => {
    try {
        let idLugar = req.params.id_lugar;
        let idHorario = req.params.id_horarios;
        const dataLugar = await lugaresSchema.findById(idLugar);
        const dataHorario = await horariosSchema.findById(idHorario);

        const detalleCita = {
            lugar: dataLugar,
            horario: dataHorario
        };

        res.status(200).json(detalleCita);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});

module.exports = app;