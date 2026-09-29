const { contextBridge, ipcMain } = require('electron');
const Database = require('better-sqlite3');
const path = require('path');
const os = require('os');

const DB_PATH = path.join(os.homedir(), '.orbit-hr', 'orbit.db');
const db = new Database(DB_PATH);

// Enable foreign keys
db.pragma('foreign_keys = ON');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => '1.0.0',
  getStoragePath: () => path.join(os.homedir(), '.orbit-hr'),
});
