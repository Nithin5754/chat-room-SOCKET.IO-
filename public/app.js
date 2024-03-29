


const socket =io('ws://localhost:3500')

const msgInput=  document.querySelector('#message')
const nameInput=  document.querySelector('#name')
const chatRoom=  document.querySelector('#room')
const activity=document.querySelector('.activity')
const roomList=document.querySelector('.room-list')
const usersList=document.querySelector('.user-list')
const chatDisplay=document.querySelector('.chat-display')
function sendMessage(e) {
  e.preventDefault()

  if(msgInput.value&&nameInput.value&&chatRoom.value){
    socket.emit("message",{
     "text": msgInput.value,
     "name":nameInput.value,


    })
    msgInput.value=''
  }
msgInput.focus()
}

function enterRoom(e) {
  e.preventDefault()
  if(msgInput.value&&nameInput.value){
socket.emit('enterRoom',{
  "name":nameInput.value,
  "room":chatRoom.value
})
  }
  
}


document.querySelector('.form-msg')
.addEventListener('submit',sendMessage)

document.querySelector('.form-join')
.addEventListener('submit',enterRoom)

msgInput.addEventListener('keypress',()=>{
  socket.emit('activity',nameInput.value)
})


//listen for messages

socket.on("message", (data) => {
  activity.textContent=" "
  const li = document.createElement('li')
  li.textContent =`${data}`
  document.querySelector('ul').appendChild(li)
 


})




let activityTimer

socket.on('activity',(data)=>{
  activity.textContent=data+"is typing....";

  //clear after 3 second
 clearTimeout(activityTimer)

 activityTimer=setTimeout(() => {
  activity.textContent=''
 },300);



})