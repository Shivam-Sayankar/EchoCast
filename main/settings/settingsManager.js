const { app } = require('electron')
const fs = require('node:fs/promises')
const path = require('node:path')

const settingsFilePath = path.join(app.getPath('userData'), 'settings.json')

const DEFAULT_SETTINGS = {
    "theme": "dark"
}

let currentSettings = {}

async function ensureSettingFileExists() {

    try {
        await fs.access(settingsFilePath)
        console.log('Setting file exists')
    }

    catch (error) {

        if (error.code === 'ENOENT') {
            await fs.writeFile(
                settingsFilePath,
                JSON.stringify(DEFAULT_SETTINGS, null, 2)
            )
            console.log('Settings file created with default values')
        }

        else {
            throw error;
        }

    }
}

async function initializeSettings() {

    await ensureSettingFileExists()

    const data = await fs.readFile(settingsFilePath, 'utf-8')
    const userSettings = JSON.parse(data)

    currentSettings = {
        ...DEFAULT_SETTINGS,
        ...userSettings
    }

    console.log('current settings:', currentSettings)
}

function getSettings() {
    return currentSettings
}

async function updateSettings(settings) {
    currentSettings = {
        ...currentSettings,
        ...settings
    }

    fs.writeFile(
        settingsFilePath,
        JSON.stringify(currentSettings, null, 2)
    )

    console.log('Settings updated:', currentSettings)
}

async function resetSettings() {
    currentSettings = {
        ...DEFAULT_SETTINGS
    }

    await fs.writeFile(
        settingsFilePath,
        JSON.stringify(currentSettings, null, 2)
    )
    console.log("Settings set back to defaults")
}

module.exports = {
    initializeSettings,
    updateSettings,
    resetSettings,
    getSettings,
}