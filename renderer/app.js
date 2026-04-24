
const homeView = document.getElementById('home-view')
const settingsView = document.getElementById('settings-view')

const settingsBtn = document.getElementById("settings-btn")
const backBtnSettingsView = document.getElementById('settings-view-back-btn')


settingsBtn.addEventListener('click', () => {
    // alert('Settings Button Clicked')
    homeView.classList.toggle('hidden')
    settingsView.classList.toggle('hidden')
})

backBtnSettingsView.addEventListener('click', () => {
    homeView.classList.toggle('hidden')
    settingsView.classList.toggle('hidden')
})