require('dotenv').config();
const express = require('express');
const routes = require('./routes');

require('./database');

const fileUpload = require('express-fileupload');
const app = express();

const countryRoutes = require('./routes/countries');
const userRoutes = require('./routes/users');
const manufacturerRoutes = require('./routes/manufacturers');

app.use(fileUpload());
app.use(express.json());

app.use('/countries', countryRoutes);
app.use('/users', userRoutes);
app.use('/manufacturers', manufacturerRoutes);


app.listen(process.env.PORT || 3000);