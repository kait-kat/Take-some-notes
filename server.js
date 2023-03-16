const express = require('express');
const path = require('path'); 
const htmlRoutes = require('./routes/htmlRoutes.js');
const apiRoutes = require('./routes/apiRoutes.js');


const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json()); 
app.use(express.urlencoded({ extended:true })); 
app.use(express.static(path.join(__dirname, '/assets'))); 

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log('API server now on PORT: ${PORT}'); 
});