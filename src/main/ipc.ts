/* eslint-disable @typescript-eslint/no-explicit-any */

import { app, ipcMain, ipcRenderer as eIpcRenderer } from 'electron';
import type { IpcMainEvent } from 'electron';

const ipcHandlers = {
  getPath(ev: IpcMainEvent, name: any): void {
    ev.returnValue = app.getPath(name);
  },
  getAppPath(ev: IpcMainEvent): void {
    ev.returnValue = app.getAppPath();
  },
  quitApp(): void {
    app.quit();
  },
};

type ChannelName = keyof typeof ipcHandlers;

export const initIpcMain = (): void => {
  for (const channelName in ipcHandlers) {
    const channelHandler = ipcHandlers[channelName as ChannelName];
    ipcMain.on(channelName, channelHandler);
  }
};

export const ipcRenderer = {
  /**
   * Use this to run synchronous handlers which are able
   * to send results back straight away
   */
  call(channel: ChannelName, ...args: any[]): any {
    return eIpcRenderer.sendSync(channel, ...args);
  },
  /**
   * Use this to run asynchronous handlers that reply
   * later. Responses are sent through the argument cb.
   *
   * @argument cb  Callback that receives the response value.
   */
  send(
    channel: ChannelName,
    args: any[] = [],
    cb: (...res: any[]) => void = (...res): void => {
      console.log(res);
    }
  ): void {
    eIpcRenderer.once(channel, (_event, ...args) => cb(...args));
    eIpcRenderer.send(channel, ...args);
  },
};
