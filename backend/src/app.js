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

const userRouter = require('./routes/users.routes');
const adminRouter = require('./routes/admins.routes');
const addressRouter = require('./routes/address.routes');
const labelRouter = require('./routes/labels.routes');

app.use('/api', userRouter);
app.use('/api', adminRouter);
app.use('/api', addressRouter);
app.use('/api', labelRouter);

module.exports = app;
