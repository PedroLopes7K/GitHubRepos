import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

// const root = ReactDOM.createRoot(document.getElementById('root'))
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// ReactDOM.render(<App />, document.getElementById('root'))
const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(<App />)
