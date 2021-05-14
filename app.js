const express = require('express');
const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);
//We'll store our online users here
let onlineUsers = {};
let channels = {
    "General": []
};

io.on("connection", (socket) => {
    // Make sure to send the channels to our chat file
    require('./sockets/chat.js')(io, socket, onlineUsers, channels);
});
//app.js
//Express View Engine for Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//Establish your public folder
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('index');
})

server.listen('3000', () => {
    console.log('Server listening on Port 3000');
})