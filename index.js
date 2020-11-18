const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
require('dotenv').config();
const contactRouter = require('./contacts/contact.routers');
const usersRouter = require('./users/users.routers');

const DB_URL = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.9g6qk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 3000;

class Server {
  constructor() {
    this.server = null;
  }

  startServer() {
    this.mongoDBConnection();
    this.initMiddlewares();
    this.initRoutes();
    this.listenServer();
  }

  async mongoDBConnection() {
    try {
      this.server = express();
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connection successful');
    } catch (err) {
      console.log('Connection failed');
      process.exit(1);
    }
  }

  initRoutes() {
    this.server.use('/api', contactRouter);
    this.server.use('/auth', usersRouter);
  }

  initMiddlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(morgan('dev'));
  }

  listenServer() {
    this.server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  }
}

const server = new Server();
server.startServer();
