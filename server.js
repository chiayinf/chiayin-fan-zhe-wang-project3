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


//Setup MongoDB Connection
const mongoString = process.env.MONGODB_URI || 'mongodb://localhost/';
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

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
  


app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});