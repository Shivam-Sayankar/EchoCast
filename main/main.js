console.log("Hare Krishna!")

require('electron-reloader')(module);
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const path = require('node:path')

// Import IPC handlers
require('./ipc/handlers')

// Disable Top Menu bar
Menu.setApplicationMenu(null)

const createWindow = () => {
    const win = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadFile(path.join(__dirname, '../renderer/index.html'))

    win.on('will-resize', (event) => {
        event.preventDefault()
    })
}



app.whenReady().then(() => {
    createWindow()

    // Open a window if none are open (MacOS) - darwin
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

// Quit the app when all windows are closed (Windows & Linux)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})