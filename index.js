import express from 'express';
//const express = require('express');

import bodyParser from 'body-parser';
//const bodyParser = require('body-parser');

import usersRoutes from './routes/users.js';
//const usersRoutes = require('./routes/users.js');
//const mongoose = require('mongoose');
//import mongoose from 'mongoose';

//import {initDb, getDb} from './db.js';
import db from './db.js';
//const db = require('./db');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/users', usersRoutes);

//1st route
app.get('/', (req, res) => {
    //console.log('[TEST]!');
    res.send('Hello from homepage.');
});

//app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

//mongoose.connect(`mongodb://localhost:$`);
db.initDb((err, db) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
    }
  });

//export default db;