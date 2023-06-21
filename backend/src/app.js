const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

const router = require('./router');

app.use(router);

module.exports = app;
