const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    startHosting: () => ipcRenderer.send('start-hosting'),
    joinSession: (ip) => ipcRenderer.send('join-session', ip),
    onStatusUpdate: (callback) => {
        ipcRenderer.on('status-update', (event, message) => {
            callback(message)
        })
    },
    getSettings: () => ipcRenderer.invoke('get-settings'),
    updateSettings: (settings) => ipcRenderer.invoke('update-settings', settings),
    resetSettings: () => ipcRenderer.invoke('reset-settings')
})