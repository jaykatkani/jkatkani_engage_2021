const io = require("./../server").io;


// everytime a socket connection is made  we can performs different functions
// we will use it in our call-page to display/emit/broaddcast messages
// we have made call back functions for various functions we will need in our app
module.exports = (socket) => {
  try {
    console.log("Connected");
    socket.on("code", (data, callback) => {
      socket.broadcast.emit("code", data);                            // when user is connected
    });
    console.log("disConnected");
    socket.on("user-disconnected", (data, callback) => {
      socket.broadcast.emit("user-disconnected", data);               // when user is disconnected
    });
    console.log("start-meet");
    socket.on("start-meet", (data, callback) => {
      socket.broadcast.emit("start-meet", data);                      // when user starts meeting
    });
    console.log("end-meet");
    socket.on("end-meet", (data, callback) => {
      socket.broadcast.emit("end-meet", data);                      // when user ends meeting
    });
  } catch (ex) {
    console.log(ex.message);                                          // if any error occurs
  }
};