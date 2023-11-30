const express  = require('express');
const auth = require('../models/auth');
const app = express();
const bcrypt = require('bcrypt');

app.post('/signup', async (req, res) => {
    try {
        const signup = new auth(req.body);
        const data = await signup.save();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ msj: "error" });
    }
});

app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        const usuario = await auth.findOne({ email: data.email });
        if (!usuario) {
            return res.status(404).json({ msj: "Correo no encontrado" });
        }
        bcrypt.compare(data.password, usuario.password, function(err, result) {
            if (result) {
                res.status(200).json({ msj: `BIENVENIDO: ${usuario.nombre} !!` });
            } else {
                res.status(401).json({ msj: "Credenciales Incorrectas" });
            }
        });
    } catch (error) {
        res.status(500).json({ msj: "Error interno del servidor" });
    }
});


module.exports = app;