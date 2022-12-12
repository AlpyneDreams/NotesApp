import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './views/App'

import './dist/bootstrap/js/bootstrap.bundle.min.js'

const root = createRoot(document.getElementById('root'))
root.render(<App />)