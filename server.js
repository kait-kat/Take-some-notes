const express = require("express");
const htmlRoutes = require('./routes/htmlRoutes');
const path = require('path');
const fs = require("fs");


const app = express();

const PORT = process.env.PORT || 3001;

const root = path.resolve();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use (express.static(__dirname));
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});