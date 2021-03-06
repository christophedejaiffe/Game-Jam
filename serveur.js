const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

let serverDie
let arr = []
app.use(express.static("asset"))
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', socket => {

//  reçu de socket input 
    socket.on('input', function(input) {
        arr.push({
            socket:socket.id,
            input:input,
        })
        let index = input.username;
        io.emit("new user",index)
    })

    socket.on("Scored",(data) => {  
        for(let i = 0; i < arr.length;i++) {
            if(arr[i].input.username == data.username)
                arr[i].input.score = data.score
        }
        arr.sort(function (a, b) {
            return a.input.score - b.input.score
        });
        arr.forEach(function(v) {
           console.log(v.input.username+" avec "+v.input.score);    
        })
        socket.emit("ScoretoClient", arr)
        
    })
   
    socket.on('disconnect', function (username) {
        let num = -1;
        let index = arr.find((value,index) => {
            num = index;
            return value.socket == socket.id;
            
        });
        if(index){
            io.emit("user disconnect",index.username);
            console.log(index.input.username+' disconnect')
            arr.splice(num,1);
        }
    });
})

server.listen(8085)