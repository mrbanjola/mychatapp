const socket = io()


const { username, room } = Qs.parse(location.search, {ignoreQueryPrefix: true})

//Elements
const $messages = document.querySelector("#messageArea");

//Templates
const messageTemplate = document.querySelector("#messageTemplate").innerHTML;



socket.emit("join", {username,room}, (error) => {



})

socket.on("Hello", (msg) => {


    console.log(msg);
    document.querySelector("#topUser").innerHTML = username;
    document.querySelector("#topRoom").innerHTML = room;


})

socket.on("newMessage", (msg,username) => {

    
    console.log(msg);
    var timeStamp = new Date().getTime();
    timeStamp = moment(timeStamp) .format("MMMM Do YYYY, hh:mm")
    var html = Mustache.render(messageTemplate, {

        msg: msg,
        username: username,
        timeStamp: timeStamp

    });
    $messages.insertAdjacentHTML('beforeend',html)


})

socket.on("newUser", () => {


    console.log("New dude is in the mood")

})




document.querySelector("#sendMessage").addEventListener("click", (e) => {

    e.preventDefault();
    var msg = document.getElementById("messageContent").value
    if (msg) {
        
        socket.emit("messageSent",msg,username,room)

        document.getElementById("messageContent").value = ""
    }

})



