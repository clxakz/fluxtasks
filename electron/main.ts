import { app, BrowserWindow, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import Store from 'electron-store';
const db = new Store();

const __dirname = path.dirname(fileURLToPath(import.meta.url))
process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 700,
    title: "Fluxtasks",
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "rgba(0,0,0,0)",
      symbolColor: "rgb(79,79,79)",
      height: 24,
    },
    maximizable: false,
    resizable: false,


    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools({ mode: "detach" });
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // Hide menu-bar
  win.setMenu(null);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.disableHardwareAcceleration();
app.whenReady().then(() => {
  createWindow();

  ipcMain.on("db-save", (_event, tasks: [{id: number, isChecked: boolean, text: string}]) => {
    db.set("tasks", tasks);
  })

  ipcMain.handle("db-load", async (_event) => {
    const result = await db.get("tasks");
    return result;
  })
})
