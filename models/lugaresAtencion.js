const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', counterSchema);

const lugaresSchema = new mongoose.Schema({
    _id: { type: Number, default: 0 },
    ubicacion :String,
    direccion: String,
    nombre: String,
    tipo: String,
});


lugaresSchema.pre('save', async function (next) {
    const doc = this;
    if (doc.isNew) {
        try {
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'lugaresId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
                );
                doc._id = counter.seq;
            } catch (err) {
                return next(err);
            }
        }
        return next();
    });
    
    module.exports = mongoose.model('Lugares', lugaresSchema);
