import { ipcRenderer, contextBridge } from 'electron'

contextBridge.exposeInMainWorld("api", {
    saveDb: ( tasks: {id: number, isChecked: boolean, text: string}[] ) => ipcRenderer.send("db-save", tasks),
    loadDb: () => ipcRenderer.invoke("db-load"),
})