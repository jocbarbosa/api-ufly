require('dotenv').config();
const express = require('express');
const routes = require('./routes');

require('./database');

const fileUpload = require('express-fileupload');
const app = express();

const countryRoutes = require('./routes/countries');
const userRoutes = require('./routes/users');


app.use(fileUpload());
app.use(express.json());
app.use('/countries', countryRoutes);
app.use('/users', userRoutes);


app.listen(process.env.PORT || 3000);