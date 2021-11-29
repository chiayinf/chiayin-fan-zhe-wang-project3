const express = require('express');
const pokemon = require('./pokemon.js');
// fix localhost 3000 and 8000
var cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/pokemon', pokemon);  
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

app.get('/', (req, res) => {
    res.send('NOT BANANA!');
});

app.listen(8000, function() {
    console.log('Starting server');
});