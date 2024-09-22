import { Server } from "socket.io";
import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const app = express();
const server = createServer(app);
const __dirname = dirname(fileURLToPath(import.meta.url));
const io = new Server(server);

app.use(express.static('node_modules/socket.io/client-dist'))

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

    io.on('connection', (socket) => {

        console.log('a user connected');
    
        socket.broadcast.emit('hi');
    
        socket.on('chat message', (msg) => {
            io.emit('chat message', msg);
            console.log('message: ' + msg);
          });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });


    });


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
