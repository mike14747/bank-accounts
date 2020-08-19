require('dotenv').config();
const PORT = process.env.PORT || 3001;

const express = require('express');
const app = express();
// const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', require('./controllers'));

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));
