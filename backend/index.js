require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = require('./src/app');

const port = parseInt(process.env.APP_PORT ?? '5001', 10);

const route = path.join(__dirname, './public/');

app.use(express.json());
app.use('/api/public', express.static(route));

app.listen(port, (err) => {
  if (err) {
    console.error('Something bad happened');
  } else {
    console.warn(`Server is listening on ${port}`);
  }
});
