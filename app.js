require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const process = require('process');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimit');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_URL } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(MONGO_URL);

app.use(express.json());

app.use(cors);

app.use(requestLogger);

app.use(helmet());

app.use(limiter);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

process.on('uncaughtException', (err) => {
  console.log(err);
});

app.listen(PORT);
