const mongoose = require('mongoose');

const horariosSchema = new mongoose.Schema({
    hora: String,
    fecha: String,
    status: String,
    id_lugar: String,
});

module.exports = mongoose.model('Horarios', horariosSchema);