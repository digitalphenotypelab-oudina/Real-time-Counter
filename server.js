const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let count = 0;

app.use(express.static('public'));

// FONCTION DE RESET AUTOMATIQUE
// Vérifie toutes les heures, et si il est entre 3h et 4h du matin, remet à zéro.
setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours === 3 && count !== 0) { 
        count = 0;
        io.emit('update', count);
        console.log("Reset de nuit effectué.");
    }
}, 3600000); // 3600000 ms = 1 heure

io.on('connection', (socket) => {
    socket.emit('update', count);

    socket.on('entree', () => {
        count++;
        io.emit('update', count);
    });

    socket.on('sortie', () => {
        if(count > 0) count--;
        io.emit('update', count);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
