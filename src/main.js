const { app, screen, BrowserWindow, nativeTheme, ipcMain, dialog } = require('electron')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const WINDOW_WIDTH = 1024
const WINDOW_HEIGHT = 768

const createWindow = () => {
  let bounds = screen.getPrimaryDisplay().bounds
  let x = bounds.x + ((bounds.width - WINDOW_WIDTH) / 2)
  let y = bounds.y + ((bounds.height - WINDOW_HEIGHT) / 2)

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    frame: false,
    transparent: true,
    hasShadow: true,
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    x, y,
    minWidth: 1024, minHeight: 400,
    center: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
    }
  })

  ipcMain.handle('open-dialog', async (e, options) => {
    let {canceled, filePaths} = await dialog.showOpenDialog(mainWindow, options)
    return canceled ? null : (filePaths.length > 1 ? filePaths : filePaths[0])
  })

  ipcMain.handle('find', (e, text, options) => {
    if (!text) {
      return mainWindow.webContents.stopFindInPage(typeof(options) === 'string' ? options : 'clearSelection')
    }
    return mainWindow.webContents.findInPage(text, options)
  })

  mainWindow.webContents.on('found-in-page', (e, result) => {
    mainWindow.webContents.send('found-in-page', result)
  })
  
  ipcMain.handle('theme', (e, theme) => {
    nativeTheme.themeSource = theme
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
