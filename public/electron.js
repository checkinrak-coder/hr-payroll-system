const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

const isDev = require('electron-is-dev');

const APP_DATA_DIR = path.join(os.homedir(), '.orbit-hr');
const DB_PATH = path.join(APP_DATA_DIR, 'orbit.db');

let mainWindow;

function ensureDataDirectory() {
  if (!fs.existsSync(APP_DATA_DIR)) {
    fs.mkdirSync(APP_DATA_DIR, { recursive: true });
    console.log(`Created app data directory: ${APP_DATA_DIR}`);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: process.platform === 'win32' ? path.join(__dirname, 'icon.ico') : path.join(__dirname, 'icon.png'),
  });

  // Set DATABASE_URL for this window
  process.env.DATABASE_URL = `file:${DB_PATH}`;

  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../.next/standalone/.next/server/app')}`;

  mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  ensureDataDirectory();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

const menu = Menu.buildFromTemplate([
  {
    label: 'File',
    submenu: [{ label: 'Exit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() }],
  },
  {
    label: 'Edit',
    submenu: [{ role: 'undo' }, { role: 'redo' }, { type: 'separator' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }],
  },
  {
    label: 'Help',
    submenu: [{ label: 'About Orbit HR', click: () => {} }],
  },
]);

Menu.setApplicationMenu(menu);

ipcMain.handle('get-app-data-path', () => APP_DATA_DIR);
ipcMain.handle('get-db-path', () => DB_PATH);
