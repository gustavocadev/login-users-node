require("dotenv").config();
require("./config/passport");

const Server = require("./server");

const server = new Server();

server.listen();
