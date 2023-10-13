require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose =  require('mongoose');

const app = express();
const PORT = process.env.PORT;

var bicycleRouter = require('./routes/routerBicycle');
var homeRouter = require('./routes/router');

// Database
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Conected to the database"));


// Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({
    secret: "My secret key",
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// set template engine
app.set("view engine", "ejs");

// routes 
app.use('/', homeRouter);
app.use('/bicycle', bicycleRouter);

app.listen(PORT, (req, res) => {
    console.log(`Server started at http://localhost:${PORT}`)
});