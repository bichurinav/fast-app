const { app, ipcMain, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const exec = require('child_process').exec

const createWindow = () => {

    Menu.setApplicationMenu(null)

    const mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    mainWin.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '../build/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWin.webContents.openDevTools()


    ipcMain.on('open-app', (event, source) => {
        execute(`"${source}"`, () => {
            console.log('open: ', source)
        })
    })

    function execute(command, callback) {
        exec(command, (error, stdout, stderr) => {
            callback(stdout);
        });
    };

}

app.whenReady().then(() => {
    createWindow();
})
