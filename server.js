const express = require('express');
const users = require('./routes/user.js');
const jobs = require('./routes/job.js');
const favs = require('./routes/favorite.js');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');

const cookieParser = require('cookie-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');


// fix localhost 3000 and 8000
const mongoDBEndpoint = "mongodb+srv://webdeva3:z876pxp6prGCS9E@webdeva3.ykuzi.mongodb.net/WebDevA3?retryWrites=true&w=majority"
                         
/* One issue, however, is that you never want this kind of database connection string in your code base as if anyone found it, they could do a lot of damage.  So after testing, set the line to:
   const mongoDBEndpoint = process.env.MONGODB_URI || 'mongodb://127.0.0.1/collection_name';
 */

// //Setup MongoDB Connection
// mongoose.connect(mongoDBEndpoint, { useNewUrlParser: true })
// //Get the connection string   
// const mongoDB = mongoose.connection;
// // Create connection, and throw an error if it doesn't work
// mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
// mongoDB.on('open', ()=> console.log('connect to mongoose!'));




//Setup MongoDB Connection
const mongoString =  mongoDBEndpoint;
mongoose.connect( mongoString, { useNewUrlParser: true })

const mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
mongoDB.on('open', ()=> console.log('connected to mongoose!',  mongoString));
const app = express();

// Store session in mongoDB
app.use(session({secret: "SUPER_DUPER_SECRET",
    store: MongoStore.create({ mongoUrl: mongoString }),
}));

app.use(cors())
app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', users);
app.use('/api/jobs', jobs);
app.use('/api/favs', favs);

// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes 

app.use(express.static(path.join(__dirname, 'build')));

// app.get('*', function (req, res) {
//     console.log("received request");
//     res.sendFile(path.join(__dirname, "build", "index.html"));
//     // res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });



app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});