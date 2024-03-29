// import { createServer  } from "http";
import express from 'express'
import path from 'path'
import { Server} from "socket.io";
import { fileURLToPath } from "url"

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const PORT=process.env.PORT||3500

const ADMIN="Admin"


// const httpServer=createServer()

const app=express()

app.use(express.static(path.join(__dirname,'public')))

const expressServer=app.listen(PORT,()=>console.log("server started"))


const io=new Server(expressServer,{
  cors:{
    origin:process.env.NODE_ENV==='production'?false:["http://localhost:5500","http://127.0.0.1:5500"]
  }
})
 

io.on('connection',socket=>{
    console.log(`User:${socket.id} connected`)

    //connection only to users

    socket.emit('message','welcome to the chat app!')

    //  connection only to all others

    socket.broadcast.emit('message',`User: ${socket.id.substring(0,5)} connected`)


     
    // listening for message event

    socket.on('message', data => {
      console.log('Received message:', data);
      io.emit('message', `${socket.id.substring(0,5)}: ${data} ` );
  })

  //when user disconnect to all others

    socket.on('disconnect',()=>{
        socket.broadcast.emit('message',`User: ${socket.id.substring(0,5)} disconnected`)
    })

    //listen for activity

    socket.on('activity',(name)=>{
      socket.broadcast.emit('activity',name)
    })
  
})


// httpServer.listen(3500,()=>console.log("server  is started!...."))

 

