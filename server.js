const express = require('express');
const pokemon = require('./pokemon.js');
// fix localhost 3000 and 8000
var cors = require('cors')
const mongoDBEndpoint = "mongodb+srv://webdeva3:z876pxp6prGCS9E@webdeva3.ykuzi.mongodb.net/WebDevA3?retryWrites=true&w=majority"
                         
/* One issue, however, is that you never want this kind of database connection string in your code base as if anyone found it, they could do a lot of damage.  So after testing, set the line to:
   const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/collection_name';
 */
const mongoose = require('mongoose');



/* const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@webdeva3.ykuzi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(mongoDBEndpoint, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
}); */


//Setup MongoDB Connection
mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true })
//Get the connection string   
const mongoDB = mongoose.connection;
// Create connection, and throw an error if it doesn't work
mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
mongoDB.on('open', ()=> console.log('connect to mongoose!'));

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