const express = require('express');
const app = express();
const horariosSchema = require("../models/horarios");

app.post('/agregarHorarios', async(req, res) => {
    try {
        const horarios = new horariosSchema(req.body);
        const data = await horarios.save();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});

app.get('/obtenerHorarios/:id_lugar', async(req, res) => {
    try {
        let idLugar = req.params.id_lugar;
        const data = await horariosSchema.find({ id_lugar: idLugar });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});


app.put('/actualizar/:id_horario', async(req, res) => {
    try {
        let idHorario = req.params.id_horario;
        const nuevoStatus = req.body.status;

        const horarioActualizado = await horariosSchema.findByIdAndUpdate(
            idHorario, { $set: { status: nuevoStatus } }, { new: true }
        );
        res.status(200).json(horarioActualizado);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});


app.delete('/eliminarHorarios/:id', async(req, res) => {
    try {
        let id = req.params.id;
        const data = await horariosSchema.deleteOne({ _id: id });
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});



module.exports = app;