const { ipcMain, BrowserWindow } = require('electron')
const settingsManager = require('../settings/settingsManager')

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

ipcMain.handle('get-settings', () => {
    return settingsManager.getSettings()
})


ipcMain.handle('update-settings', async (e, currentSettings) => {
    // take currentSettings from renderer side
    // then send them to main to write onto json
    await settingsManager.updateSettings(currentSettings)
    return true
})

ipcMain.handle('reset-settings', async () => {
    await settingsManager.resetSettings()
    return true
})