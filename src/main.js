const {app, BrowserWindow} = require("electron"); // CommonJS
const Store = require('electron-store');
Store.initRenderer();
function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('src/template/index.html')

    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)
app.on("window-all-closed", () => {
    app.quit()
})


// Vanilla ?
// Custom-Element
// ShadowDOM 