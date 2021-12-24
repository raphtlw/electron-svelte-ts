/* eslint-disable @typescript-eslint/no-var-requires */

import { contextBridge } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { ipcRenderer } from './ipc';

const constants = {
  BACKEND_URL: 'https://brewclient.vercel.app/api',
  APP_FOLDER: 'brewclient',
};
const paths = {
  CACHE_PATH: path.join(
    ipcRenderer.call('getPath', 'cache'),
    constants.APP_FOLDER
  ),
  APP_PATH: ipcRenderer.call('getAppPath'),
};

const windowElectron = {
  constants,
  paths,
  mod: {
    path,
    fs,
  },
  ipc: ipcRenderer,
};

declare global {
  interface Window {
    electron: typeof windowElectron;
  }
}

// Create directories if not exists
if (!fs.existsSync(paths.CACHE_PATH)) {
  fs.mkdirSync(paths.CACHE_PATH);
}

contextBridge.exposeInMainWorld('electron', windowElectron);

// Hot reloading
try {
  require('electron-reloader')(module);
  // eslint-disable-next-line no-empty
} catch (_) {}
