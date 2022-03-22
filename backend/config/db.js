const mongoose = require('mongoose');
require('dotenv').config();

const connection = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO);
        console.log('CONNECTED');
    } catch (error) {
        console.log(error);
        process.exit(1);
    } 
}

module.exports = connection;