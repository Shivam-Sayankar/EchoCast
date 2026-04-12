const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    startHosting: () => ipcRenderer.send('start-hosting'),
    joinSession: (ip) => ipcRenderer.send('join-session', ip),
    onStatusUpdate: (callback) => {
        ipcRenderer.on('status-update', (event, message) => {
            callback(message)
        })
    }
})