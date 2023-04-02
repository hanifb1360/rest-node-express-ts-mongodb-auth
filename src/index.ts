import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

// create an instance of express app
const app = express();

// enable cross-origin resource sharing with credentials
app.use(
  cors({
    credentials: true,
  })
);

// use cookie-parser middleware
app.use(cookieParser());

// use compression middleware to compress responses
app.use(compression());

// parse JSON-encoded request bodies using body-parser middleware
app.use(bodyParser.json());

// create an HTTP server using the express app
const server = http.createServer(app);

// start listening on port 8080
server.listen(8080, () => {
  console.log('listening on port 8080');
});

// specify the MongoDB connection URL
const MONGO_URL =
  'mongodb+srv://hanif:hanif@cluster0.hvptjbe.mongodb.net/?retryWrites=true&w=majority';

// set the mongoose Promise implementation to use native ES6 Promises
mongoose.Promise = Promise;

// connect to the MongoDB server
mongoose.connect(MONGO_URL);

// listen for errors on the MongoDB connection
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
