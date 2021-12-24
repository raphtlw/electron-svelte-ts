/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-var-requires */

import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import { initIpcMain } from './ipc';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  // Cross platform solution for icons
  // Use `npx electron-icon-maker --input=./icon.png --output=./public`
  // to create the icons
  let icon: string;
  if (process.platform === 'linux') {
    icon = path.join(app.getAppPath(), 'public', 'icons', 'png', '512x512.png');
  } else if (process.platform === 'win32') {
    icon = path.join(app.getAppPath(), 'public', 'icons', 'win', 'icon.ico');
  } else if (process.platform === 'darwin') {
    icon = path.join(app.getAppPath(), 'public', 'icons', 'mac', 'icon.icns');
  }

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    icon,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(app.getAppPath(), 'public', 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

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

// Register IPC handlers
initIpcMain();

// Hot reloading
try {
  require('electron-reloader')(module);
} catch (_) {}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
