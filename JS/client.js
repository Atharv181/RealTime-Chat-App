//Connect node server with frontend js
const socket = io('http://localhost:8000');
//Ask the name of user when joined
const name1 = prompt("Enter your name");

//grab the html by js
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.getElementById('msgcont');

//append function used here for inserting message in container
const append =(message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);  
}

form.addEventListener('submit' , (e)=>{
    //used for not reloading the page
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}` , "right");
    socket.emit('send' , message);
    messageInput.value= ""
    
})
//emit function used for sending the event to Node Server
socket.emit("new-user-joined" , name1);

//.on means when specific function called from function then listen 
socket.on("user-joined" , name=>{
    append(`${name} joined the chat`, 'middle');
})

socket.on("receive" , data=>{
    append(`${data.name}: ${data.message}` , "left");
    
})

socket.on("leave" , name1=>{
    append(`${name1} left the chat` , "middle");
})