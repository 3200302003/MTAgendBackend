require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Habilitación de CORS
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const agendaApp = require('./routes/index');

// Conexión a MongoDB
mongoose.connect(process.env.URLDB);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error('Error de conexión a MongoDB:', err);
});

db.once('open', () => {
    console.log('Conectado a MongoDB');
});

// middlewares
app.use(express.json());
app.use("/api", agendaApp);
app.get('/', function(req,res) {res.json({mensaje:'Hola bienvenido esta es la Api-Rest!'})});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${port}`);
});
