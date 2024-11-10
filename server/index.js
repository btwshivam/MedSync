const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


// Connect to MongoDB
if (!process.env.DB_CONNECTION_STRING) {
    console.error("DB_CONNECTION_STRING is not defined in .env file");
    process.exit(1); // Exit the process with failure
}

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => {
        console.log("Successfully connected to the database.");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

// backend port setup
const app = express();
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
