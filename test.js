const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const fs = require('fs');
const Web3 = require('web3');
const web3 = new Web3();
const app = express();
const filesaver = require('FileSaver');
const cors = require('cors');
const bodyParser = require('body-parser')
const corsOptions = {origin: true,credentials: true};
const xlsx = require('xlsx');
const request = require('request');

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser().json())
