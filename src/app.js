const express = require("express")
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
const path = require("path")
const http = require('http')
const socketio = require('socket.io')
const users = require("./utils/users.js");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users.js");


 

const app = express()
const port = process.env.PORT || 8080; 
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.join(__dirname, "../public")

app.use(express.static(publicDirectoryPath));





io.on('connection',(socket) => {
    
    socket.on("join", ({username,room},callback) => {

        const { error, user } = addUser({
            id: socket.id,
            username: username,
            room: room
        })

        if (error) {

            return callback(error);

        }
        

        socket.join(user.room);
         
        var msg= username+" Has Joined";
        var admin = "Admin"

        socket.emit("Hello",username,room);
        socket.broadcast.to(user.room).emit("newMessage",msg,admin);



    })

    socket.on("messageSent", (msg,username,room) => {


        console.log(username," : ",msg);
        console.log(room)
        io.to(getUser(socket.id).room).emit("newMessage",msg,username);

    })

    socket.on("userleft", (username, room) => {

        socket.to(room).broadcast("UserLeft",username,room);

    })

    
    socket.on("disconnect", (username) => {

        const user = removeUser(socket.id)

        if (user) { 

            msg = user.username + " has left";
            socket.broadcast.to(user.room).emit("newMessage",msg,"Admin")
            
        }
    
    })
    
    
    

})




server.listen(port, '0.0.0.0',"8080", () => {

    console.log("Server is running on port",port)

})