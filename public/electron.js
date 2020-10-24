const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')

const createWindow = () => {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
    });

    mainWin.loadURL(startUrl);

}

app.whenReady().then(() => {
    createWindow();
    ipcMain.on('info', (event, data) => {
        console.log(data)
    })
})
