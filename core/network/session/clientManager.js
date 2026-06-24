/*
1. Connected Clients
2. Client Count
3. Client IDs
*/

const clients = new Map()

function getClientsCount() {
    return clients.size
}

function addClient(id, ws) {

    clients.set(id, {
        id,
        ws,
        connectedAt: Date.now()
    })

    console.log(`Clients Connected: ${clients.size}`)
}

function removeClient(id) {
    clients.delete(id)
    console.log(`CLients connected ${clients.size}`)
}

module.exports = {
    addClient,
    removeClient,
    getClientsCount
}