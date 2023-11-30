const express = require('express');
const app = express();

app.use('/lugares', require('./lugaresAtencion'));
app.use('/horarios', require('./horarios'));
app.use('/detalleAgenda', require('./detalleAgenda'));
app.use('/auth', require('./auth'));

module.exports = app;