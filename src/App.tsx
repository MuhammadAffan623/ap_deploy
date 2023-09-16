import { ConfigProvider } from 'antd'
import theme from './theme.json'
import UserContainer from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'

const App = () => {
  return (
    <ConfigProvider theme={theme}>
      <Router>
        <UserContainer>
          <Routes />
        </UserContainer>
      </Router>
    </ConfigProvider>
  )
}

export default App
