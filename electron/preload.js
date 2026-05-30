const { contextBridge, ipcRenderer } = require("electron");

// Expose minimal API to the renderer process
contextBridge.exposeInMainWorld("electronAPI", {
  isElectron: true,
  platform: process.platform,

  // App info
  getAppInfo: () => ({
    version: "1.0.0",
    name: "AI IP操盘手",
  }),

  // File dialogs
  openFileDialog: () => ipcRenderer.invoke("open-file-dialog"),

  // Window controls
  minimizeWindow: () => ipcRenderer.send("minimize-window"),
  maximizeWindow: () => ipcRenderer.send("maximize-window"),
  closeWindow: () => ipcRenderer.send("close-window"),
});
