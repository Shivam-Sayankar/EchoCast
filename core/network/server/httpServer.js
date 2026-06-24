const http = require('node:http')
const path = require('node:path')
const fs = require('node:fs/promises')
const { PORT } = require('../config/networkConfig')
const { attachWebSocketServer } = require('./webSocketServer')

let server = null
let sessionURL = null

// Starting Server
async function startServer(selectedInterface) {
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.ttf': 'font/ttf',
        '.js': 'application/javascript',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon'
    }

    // Creating Server
    server = http.createServer(async (req, res) => {

        try {
            let filePath

            if (req.url === '/') {
                filePath = path.join(__dirname, './public/client.html')
            }

            else {
                filePath = path.join(__dirname, './public', req.url)
            }

            const fileExtension = path.extname(filePath)
            const contentType = mimeTypes[fileExtension] || 'application/octet-stream'

            const file = await fs.readFile(filePath)

            res.writeHead(200, {
                'content-type': contentType
            })
            res.end(file)
        }

        catch (error) {
            console.log(error)
        }

    })


    // Attaching WebSocket
    attachWebSocketServer(server)

    const HOST = selectedInterface.ip

    server.listen(PORT, HOST, () => {
        sessionURL = `http://${HOST}:${PORT}`
        console.log(`Successfully started server on ${sessionURL}`)
        console.log(`Clients must be connected to the same network (${selectedInterface.name}) as the host machine`)
    })
}

// Stopping Server
function stopServer() {

    if (!server) {
        console.log('No active server')
        return
    }

    console.log(`Initialising server shutdown...`)

    server.close((err) => {
        if (err) {
            console.error('Error during server shutdown')
        }
        console.log('Server successfully stopped')
    })
}

function getSessionURL() {
    return sessionURL
}

function isServerRunning() {
    return server !== null
}

// startServer(
//     selectedInterface = {
//         name: 'Wi-Fi',
//         ip: '192.168.1.37'
//     }
// )

module.exports = {
    startServer,
    stopServer,
    getSessionURL,
    isServerRunning
}