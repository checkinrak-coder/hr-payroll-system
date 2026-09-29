const { contextBridge, ipcMain } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getAppDataPath: () => ipcMain.invoke('get-app-data-path'),
  getDbPath: () => ipcMain.invoke('get-db-path'),
  getVersion: () => '1.0.0',
});
