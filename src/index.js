const fs = require('fs')
const path = require('path');
const { app, BrowserWindow, dialog } = require('electron');
const { ipcMain } = require('electron')

var mainWindow = null
var devToolsOpen = false

// Quit app if game quits
ipcMain.on('game-quit', (evt, arg) => {
  app.quit()
})

ipcMain.on('load-map', (evt, arg) => {
  dialog.showOpenDialog(mainWindow, {
    filters: [{ name: 'Burglar map', extensions: ['json'] }],
    title: 'Open',
    defaultPath: path.join(__dirname, 'game/maps')
  }).then((result) => {
    if (!result.canceled && result.filePaths && result.filePaths.length) {
      fs.readFile(result.filePaths[0], (err, data) => {
        if (!err) {
          try {
            evt.reply('map-loaded', JSON.parse(data))
          } catch (error) {
            console.error(error)
          }
        }
      })
    }
  })
})

ipcMain.on('save-map', (evt, mapData) => {
  const fileName = dialog.showSaveDialog(mainWindow, {
    title: 'Save',
    defaultPath: path.join(__dirname, 'game/maps'),
    filters: [{ name: 'Burglar map', extensions: ['json'] }]
  }).then((result) => {
    if (!result.canceled && result.filePath) {
      try {
        fs.writeFile(result.filePath, JSON.stringify(mapData, null, '\t'), () => {})
      } catch (err) {
        console.error(err)
      }
    }
  })
})

ipcMain.on('toggle-dev-tools', (evt, arg) => {
  if (mainWindow) {
    devToolsOpen ? mainWindow.webContents.closeDevTools() : mainWindow.webContents.openDevTools();
    devToolsOpen = !devToolsOpen
  }
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 540,
    // frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  // mainWindow.removeMenu()
  mainWindow.webContents.openDevTools()
  // mainWindow.setResizable(false)
  mainWindow.setMenu(null)
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
};

const appReady = () => {
  createWindow()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', appReady);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
