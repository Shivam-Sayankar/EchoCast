
const ws = new WebSocket(
    `ws://${window.location.host}`
)

ws.addEventListener('open', () => {
    console.log('Connected to Websocket')

    // sending message to websocket server
    ws.send(JSON.stringify({
        type: 'client-connected'
    }))
})

// receiving message from wss
ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    console.log('Received:', data)
})

ws.addEventListener('close', () => {
    console.log('Websocket disconnected')
})