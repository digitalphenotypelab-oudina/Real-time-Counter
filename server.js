const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let count = 0; // Le compteur d'effectif

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('update', count); // Envoie le chiffre actuel au nouveau connecté

    socket.on('entree', () => {
        count++;
        io.emit('update', count); // Prévient tout le monde
    });

    socket.on('sortie', () => {
        if(count > 0) count--;
        io.emit('update', count);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
