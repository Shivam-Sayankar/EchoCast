
// Views
const homeView = document.getElementById('home-view')
const settingsView = document.getElementById('settings-view')
const extendScreenSetupView = document.getElementById('extend-screen-setup-view')

// Home View Elements
const extendScreenModeBtn = document.getElementById('mode-extend-screen')

// Settings View Elements
const settingsBtn = document.getElementById("settings-btn")
const backBtnSettingsView = document.getElementById('settings-view-back-btn')
const applySettingsBtn = document.getElementById('apply-settings-btn')
const restoreSettingsBtn = document.getElementById('restore-settings-btn')

// Extend Screen Setup View Elements
const backBtnExtendScreenView = document.getElementById('extend-screen-setup-back-btn')

// Event Listeners
extendScreenModeBtn.addEventListener('click', () => {
    homeView.classList.add('hidden')
    extendScreenSetupView.classList.remove('hidden')
})

backBtnExtendScreenView.addEventListener('click', () => {
    extendScreenSetupView.classList.add('hidden')
    homeView.classList.remove('hidden')
})

settingsBtn.addEventListener('click', () => {
    homeView.classList.add('hidden')
    settingsView.classList.remove('hidden')
})

backBtnSettingsView.addEventListener('click', () => {
    homeView.classList.remove('hidden')
    settingsView.classList.add('hidden')
})

function syncUIWithSettings(settings) {

    if (settings.theme === 'light') {
        document.body.classList.add('light')
    }
    else {
        document.body.classList.remove('light')
    }

    // Syncing radio buttons
    const themeRadioButtons = document.querySelectorAll('input[name="theme"]')

    themeRadioButtons.forEach(radioBtn => {
        radioBtn.checked = (radioBtn.value === settings.theme)
    });
}

async function loadAndSyncSettings() {
    const settings = await window.electronAPI.getSettings()
    syncUIWithSettings(settings)
}

applySettingsBtn.addEventListener('click', async (e) => {
    console.log('apply settings button pressed')
    const selectedTheme = document.querySelector('input[name="theme"]:checked').value;

    const currentSettings = { theme: selectedTheme }
    await window.electronAPI.updateSettings(currentSettings)
    loadAndSyncSettings()
})

restoreSettingsBtn.addEventListener('click', async () => {
    await window.electronAPI.resetSettings()
    loadAndSyncSettings()
    const defaultSettings = window.electronAPI.getSettings()
})

loadAndSyncSettings()