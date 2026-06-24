const WebSocket = require('ws')

let wss = null

function attachWebSocketServer(httpServer) {

    wss = new WebSocket.Server({
        server: httpServer
    })

    console.log('WebSocket server attached')

    wss.on('connection', (ws) => {

        console.log('Client Connected')

        // sending welcome message to client
        ws.send(JSON.stringify({
            type: 'connection-established',
            message: 'Welcome to EchoCast'
        }))

        // if wss receives a message
        ws.on('message', (message) => {
            // console.log(message.toString())
            try {

                const data = JSON.parse(message)
                console.log(data)
            }
            catch (error) {
                console.error('Invalid message:', message.toString())
            }
        })

        ws.on('close', () => {
            console.log('Client Disconnected')
        })
    })

}


module.exports = {
    attachWebSocketServer
}