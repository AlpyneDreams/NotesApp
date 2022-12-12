import { contextBridge, ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'

contextBridge.exposeInMainWorld('electronAPI', {
    showOpenDialog: options => ipcRenderer.invoke('open-dialog', options),
    showFolderPicker: (options={}) => {
        return ipcRenderer.invoke('open-dialog', {
            properties: ['openDirectory'],
            title: 'Select a folder',
            ...options
        })
    },
    ipc: ipcRenderer
})

// You better not let *any* remote or untrusted code run in the renderer!
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('Path', path)
