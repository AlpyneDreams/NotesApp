import { contextBridge } from 'electron'
import fs from 'fs'
import path from 'path'

// You better not let *any* remote or untrusted code run in the renderer!
contextBridge.exposeInMainWorld('fs', fs)
contextBridge.exposeInMainWorld('Path', path)