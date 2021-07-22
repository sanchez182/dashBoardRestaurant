const { app, BrowserWindow, screen: electronScreen, ipcMain } = require('electron');

const isDev = require('electron-is-dev');
const path = require('path');
const storage = require('electron-json-storage');

const { FETCH_DATA_FROM_STORAGE,
  HANDLE_FETCH_DATA,
  SAVE_DATA_IN_STORAGE,
  HANDLE_SAVE_DATA } = require('../src/utils/constanst');

let mainWindow
let itemsToTrack;

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: electronScreen.getPrimaryDisplay().workArea.width,
    height: electronScreen.getPrimaryDisplay().workArea.height,
    show: false,
    backgroundColor: 'white',
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: __dirname + '../apreload.js',
      webSecurity: false,
      //         Preload: path.join (__ DIRNAME, '../public/renderer.js'), // But preloaded JS files can still use NodeJs's API
      devTools: isDev
    }
  });
  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(startURL);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    mainWindow.loadURL(url);
  });
};

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (!BrowserWindow.getAllWindows().length) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on(FETCH_DATA_FROM_STORAGE, (event, message) => {
  const dataPath = storage.getDataPath();
  debugger
  console.log(dataPath);
  storage.get(message, (error, data) => {
    itemsToTrack = JSON.stringify(data) === "{}" ? [] : data
    if (error) {
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: false,
        message: "itemsToTrack not returned"
      })
    } else {
      mainWindow.send(HANDLE_FETCH_DATA, {
        success: true,
        message: itemsToTrack,
      })
    }
  })



})

ipcMain.on(SAVE_DATA_IN_STORAGE, (event, message) => {

  itemsToTrack.push(message);
  storage.set("storedItems", itemsToTrack, (error) => {
    if (error) {
      mainWindow.send(HANDLE_SAVE_DATA, {
        success: false,
        message: "itemsToTrack not saved"
      })
    } else {
      mainWindow.send(HANDLE_SAVE_DATA, {
        success: true,
        message
      })
    }
  })


})