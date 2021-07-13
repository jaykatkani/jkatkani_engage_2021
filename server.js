require("dotenv").config();
const Routes = require("./app/routes");
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT;
const app = express();
const server = http.createServer(app);


// we created an app folder that holds all backend related files and here we imported all that files created 

// it contains all back-end related file
app.use([
  cors(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: false }),
  Routes,
]);

// const io = (module.exports.io = require("socket.io")(server));
const io = (module.exports.io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
}));

// display message in consle when users connect
const socketManager = require("./app/socketManager");
io.on("connection", socketManager);
console.log("user connected");

// listen to server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});