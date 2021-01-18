const express = require("express");
const mongoose = require("mongoose");
const alert = require('awesome-cli-alerts');
const app = express();

const PORT = process.env.PORT || 3000;

// importing Routes
const user = require('./routes/users');
const home = require('./routes/home');

// original connection String
// mongoose.connect(`mongodb+srv://${userName}:${password}@shaoor-tech.djiac.mongodb.net/${db}?retryWrites=true&w=majority`, {useUnifiedTopology:true,useNewUrlParser:true}).then(() => alert(''));
// test
mongoose.connect(`mongodb://localhost:27017/user`, { useUnifiedTopology: true, useNewUrlParser: false }).then(() => alert({ type: 'success', msg:'DB Got Connected', name: 'mongodb'}));

// middlewares
// NOTE: NO NEED TO GET BODT-PARSER it comes right out of the box with express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', home)
app.use('/api/users', user);


app.listen(PORT, () => alert({ type: `success`, msg: `App running on http://localhost:${PORT}`, name:`Express`}));
