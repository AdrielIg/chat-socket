const socket = io.connect()

socket.on('messages', data => {
  console.log(data)
  render(data)
})

const render = data => {
  const html = data.map(elemento => {
    return (`
    <div>
      <strong>${elemento.author}</strong>
      <em>${elemento.text}</em>
    </div>`)
  }).join(' ')
  document.getElementById('messages').innerHTML = html

}

const addMessage = (e) => {
  const message = {
    author: document.getElementById('name').value,
    text: document.getElementById('text').value,
  }
  console.log(message)
  socket.emit('newMessage', message)
  return false
}