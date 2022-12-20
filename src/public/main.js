let socket = io()

let form = document.getElementById('form');
let input = document.getElementById('input');

socket.emit("join", "hello from client")
socket.on("server join", (msg) => {
  alert (msg)
}) 

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
})