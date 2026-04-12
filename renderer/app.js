
const hostButton = document.getElementById('host-btn')
const joinButton = document.getElementById('join-btn')
const ipInput = document.getElementById('ip-input')
const statusDisplay = document.getElementById('status')

hostButton.addEventListener('click', () => {
    window.electronAPI.startHosting()
})

joinButton.addEventListener('click', () => {
    window.electronAPI.joinSession(ipInput.value)
})

window.electronAPI.onStatusUpdate((status) => {
    statusDisplay.innerText = status
})