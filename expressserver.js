const http = require("http");
const app = require("express")();
const fs = require("fs");

//
const server = http.createServer(app);
const io = require("socket.io").listen(server);
//
app.get("/", (req, res) => {
  fs.readFile("./index.html", "utf-8", function(error, content) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

io.sockets.on("connection", socket => {
  console.log("conx established");
  socket.broadcast.emit("msg", "server says hi");
  socket.on("res", function(res) {
    console.log(res);
  });
});

server.listen(3000);
console.log("listening..");
