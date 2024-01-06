import { ConfigProvider } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './store'
import { theme } from './theme'

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <Routes />
        </Provider>
      </Router>
    </ConfigProvider>
  )
}

export default App
