const { ipcMain, BrowserWindow } = require('electron')

// Hosting
ipcMain.on('start-hosting', () => {
    console.log("Main: Hosting Started")
    sendStatus("Hosting Started")
})

// Joining
ipcMain.on('join-session', (event, ip) => {
    console.log("Main: Joining", ip)
    sendStatus(`Joining: ${ip}`)
})

function sendStatus(message) {
    const win = BrowserWindow.getAllWindows()[0]
    if (win) {
        win.webContents.send('status-update', message)
    }
}