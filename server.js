const {Server} = require("socket.io");

const server = new Server();

server.on("connection",(client)=>{
});

server.listen(8000);
console.log("Server is running!!!");