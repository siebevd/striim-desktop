const {
  app,
  BrowserWindow,
  clipboard,
  globalShortcut,
  // ipcMain,
} = require('electron');

const electronLocalshortcut = require('electron-localshortcut');
const isDev = require('electron-is-dev');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  const {
    default: installExtension,
    REACT_DEVELOPER_TOOLS,
  } = require('electron-devtools-installer');

  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#0b141f',
    height: 680,
    titleBarStyle: 'hidden-inset',
    width: 900,
  });

  // and load the index.html of the app.
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`,
  );

  // Dereference the window object, usually you would store windows
  // in an array if your app supports multi windows, this is the time
  // when you should delete the corresponding element.
  mainWindow.on('closed', () => (mainWindow = null));
}

function onReady() {
  createWindow();

  // Register the play/pause keyboard press
  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('playpause', 'toggle');
  });

  // Register the next keyboard press
  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('nextTrack', 'next');
  });

  // Register the prev keyboard press
  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('prevTrack', 'next');
  });

  // Register paste action
  // TODO: MOVE THE COPY COMMAND TO MENU
  electronLocalshortcut.register(mainWindow, 'CommandOrControl+V', () => {
    // Catch the paste command and send it to the window
    mainWindow.webContents.send('paste', clipboard.readText());
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', onReady);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu b ar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS it's common to re-create a window in the app when the
// dock icon is clicked and there are no other windows open.
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
