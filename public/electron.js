const { app, ipcMain, BrowserWindow, Menu, dialog, protocol } = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
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

    protocol.registerFileProtocol('poster', (request, callback) => {
        const url = request.url.substr(9,request.url.length -10)
        callback({path: app.getPath('userData')+'/posters/'+url})
    })

    // mainWin.webContents.openDevTools()


    ipcMain.on('open-app', (event, source) => {
        execute(`"${source}"`, () => {
            console.log('open: ', source)
        })
    })

    ipcMain.on('icon', uploadImageFile)

    function execute(command, callback) {
        exec(command, (error, stdout, stderr) => {
            callback(stdout);
        });
    };


    function uploadImageFile(event, icon) {

        const fileName = path.basename(icon)
        const imgFolderPath = path.join(app.getPath('userData'), fileName)

        fs.copyFile(icon, imgFolderPath, (err) => {
            if (err) throw err;
            console.log(fileName + ' uploaded.');
        });

        event.reply('file', imgFolderPath);

    }

}

app.whenReady().then(() => {
    createWindow();
})
