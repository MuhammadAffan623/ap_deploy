import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.scss'
import { ConfigProvider } from 'antd'
import theme from './theme.json'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
)
