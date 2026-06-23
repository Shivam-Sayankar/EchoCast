const os = require('node:os')
const dgram = require('node:dgram')

const IGNORE_INTERFACES = [
    'docker',
    'vmware',
    'virtualbox',
    'tailscale',
    'vethernet',
    'tun',
    'tap'
]

function getAvailableNetworkInterfaces() {
    const interfaces = os.networkInterfaces()

    const availableNetworkInterfaces = []

    for (const interfaceName in interfaces) {

        const lowerName = interfaceName.toLowerCase()

        if (IGNORE_INTERFACES.some(ignored_interface => lowerName.includes(ignored_interface))) {
            continue
        }

        for (const address of interfaces[interfaceName]) {
            if (address.family === 'IPv4' && !address.internal) {
                availableNetworkInterfaces.push({
                    name: interfaceName,
                    ip: address.address
                })
            }
        }
    }

    return availableNetworkInterfaces
}

function getActiveIPv4() {
    return new Promise((resolve, reject) => {
        const socket = dgram.createSocket('udp4')

        socket.connect(80, '8.8.8.8', () => {
            try {
                const ip = socket.address().address
                socket.close()
                resolve(ip)
            }

            catch (e) {
                socket.close()
                reject(e)
            }
        })

        socket.on('error', (error) => {
            socket.close()
            reject(error)
        })
    })
}

async function getInterfacesWithStatus() {
    const activeIP = await getActiveIPv4()
    const interfaces = getAvailableNetworkInterfaces()

    return interfaces.map(interfaceName => ({
        ...interfaceName,
        active: interfaceName.ip === activeIP
    }))
}

async function getPreferredNetworkInterface() {
    const interfaces = await getInterfacesWithStatus()
    return interfaces.find(interfaceName => interfaceName.active)
}

module.exports = {
    getActiveIPv4,
    getAvailableNetworkInterfaces,
    getPreferredNetworkInterface
}