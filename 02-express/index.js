const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./contacts/contact.routers')

const PORT = process.env.PORT || 3000;

class Server {
    constructor() {
        this.server = null;
    }

    startServer(){
        this.server = express();
        this.initMiddlewares();
        this.initRoutes();
        this.listenServer();
    }

    initRoutes(){
        this.server.use('/api', router);
    }

    initMiddlewares() {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use(morgan("dev"));
    }

    listenServer() {
        this.server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    }
    
}

const server = new Server();
server.startServer();

