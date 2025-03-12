"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  saveDb: (tasks) => electron.ipcRenderer.send("db-save", tasks),
  loadDb: () => electron.ipcRenderer.invoke("db-load")
});
