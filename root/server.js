const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 3001;

const root = path.resolve();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use (express.static('root'));
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server is ready on port ${PORT}!`);
});