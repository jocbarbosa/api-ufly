require('dotenv').config();
const express = require('express');

const requireDir = require('require-dir');

require('./database');

const fileUpload = require('express-fileupload');
const app = express();

const routes = requireDir('./routes');

app.use(fileUpload());
app.use(express.json());

app.use('/countries', routes.countries);
app.use('/users', routes.users);
app.use('/manufacturers', routes.manufacturers);


app.listen(process.env.PORT || 3000);