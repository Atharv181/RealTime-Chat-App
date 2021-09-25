// Node Server which will handel Socket io connection


//initialising or accessing socket io in port 8000
//For CORS policy extra line to be added 
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

//name of every user joined
const users={};

//io.on used for all the connection when user send some events
io.on("connection",socket =>{
    // socket.on is used to handel specific event
    socket.on("new-user-joined", name =>{
       // console.log(name);
        users[socket.id]=name;
        socket.broadcast.emit("user-joined",name);
    })

    socket.on("send",message=>{
        socket.broadcast.emit("receive", {message : message , name: users[socket.id]});
    })
    //disconnect event is inbuilt event in socket module
    //new-user-joined user-joined these names are given by me
    socket.on("disconnect" , message=>{
        socket.broadcast.emit("leave" ,users[socket.id]);
        delete users[socket.id];
    })
})
