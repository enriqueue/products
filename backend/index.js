const express = require('express');
const connection = require('./config/db');
const cors = require('cors');
const path = require('path');

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public/dist/contacts/')));
app.use('/api/product', require('./routes/product'));

// Conection DB
connection();

app.get('/', (req, res) => res.sendFile('index'));
app.listen( process.env.PORT || 3000, () => console.log(`Server running at port ${ process.env.PORT || 3000 }`));