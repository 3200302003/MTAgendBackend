const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({
    nombre:String,
    email: String,
    password: String,
    sexo: String,
    fechaNacimiento: String,
    ciudad: String
});

usuariosSchema.pre('save', async function(next) {
    const usuario = this;
    if (!usuario.isModified('password')) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        usuario.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Usuario = mongoose.model('Usuario', usuariosSchema);

module.exports = Usuario;

