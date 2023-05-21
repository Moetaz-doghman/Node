const bodyParser = require('body-parser')
const express = require('express')
const  mongoose  = require('mongoose')
const app = express()

// importer twig 
const path = require('path');
const twig = require('twig');
app.set('view engine', 'twig');
app.set('views', path.join(__dirname, 'views'));
// importer database
const configDB = require('./mongodb.json');

// import routes
const contact = require('./routes/contacts')

// MIDDELWARE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
//use
app.use('/contact', contact);




// connect  database 
mongoose.connect("mongodb://127.0.0.1:27017/contactTest", { useNewUrlParser: true, useUnifiedTopology: true  })
.then(() => {
console.log('Connected successfully to MongoDB server');
// Perform database operations here
})
.catch((err) => console.error(err));

app.listen(3000,()=> {
    console.log("on port 3000!!")
})
