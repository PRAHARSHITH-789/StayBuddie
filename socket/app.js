import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";


const app = express();
app.use(cors()); // Use the CORS middleware to enable CORS
app.use(express.json({ limit: '100mb' }));


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    // origin: "http://192.168.1.34:3000",
    origin: "http://localhost:3000",
    credentials: true,
  },
  pingTimeout: 5000,
  pingInterval: 1000,
});


app.post("/payments", (req, res) => {
  const userId = req.query.userId; // Use req.query.userId to access the query parameter
    // console.log(Received data: ${userId});
  const receivedData = req.body;
  // console.log(receivedData)
  // Check if the user ID matches and emit the event to the matching socket
  io.sockets.sockets.forEach((socket) => {
    // console.log(socket.handshake.query.userId);
    if (socket.handshake.query.userId === userId) {
      socket.emit("paymentRequest", receivedData);
        // console.log(receivedData);
    }
  });

  res.send("Bill Inform received.");
});


app.post("/paymentAccept", (req, res) => {
  const userId = req.query.userId; // Use req.query.userId to access the query parameter
    console.log(`Received data ${userId}`);
  const receivedData = req.body;
  // console.log(receivedData)
  // Check if the user ID matches and emit the event to the matching socket
  io.sockets.sockets.forEach((socket) => {
    // console.log(socket.handshake.query.userId);
    if (socket.handshake.query.userId === userId) {
      socket.emit("paymentAccept", receivedData);
        // console.log(receivedData);
    }
  });

  res.send("Bill Inform received.");
});




app.post("/complaint", (req, res) => {
  const userId = req.query.userId; // Use req.query.userId to access the query parameter
    // console.log(Received data: ${userId});
  const receivedData = req.body;
  // console.log(receivedData)
  // Check if the user ID matches and emit the event to the matching socket
  io.sockets.sockets.forEach((socket) => {
    // console.log(socket.handshake.query.userId);
    if (socket.handshake.query.userId === userId) {
      socket.emit("complaintRequest", receivedData);
        // console.log(receivedData);
    }
  });

  res.send("Bill Inform received.");
});





io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId; 
  console.log(userId);
  
  
  socket.on("disconnect", () => {  });
});

server.listen(5002, () => {
  console.log("Socket.IO server is running on port 5002");
});
