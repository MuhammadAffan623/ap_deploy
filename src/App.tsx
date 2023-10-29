import { ConfigProvider } from 'antd'
import UserContainer from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import { Provider } from 'react-redux'
import { store } from './store'

const App = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            colorBorder: 'rgb(232, 233, 235)'
          },
          // Menu: {
          // controlHeight:
          // },
          Form: {}
        },
        token: {
          colorBgBase: '#E8E9EB',
          colorBgLayout: '#F8F8F8',
          colorBgContainer: 'white',
          colorBgElevated: 'white',
          colorPrimary: '#304FFD',
          colorLink: '#304FFD',
          purple: '#7367F0',
          colorSuccess: '#49C96D',
          colorError: '#FD7972',
          colorWarning: '#FF965D',
          fontSize: 14,
          fontSizeHeading1: 30,
          fontSizeHeading2: 26,
          fontSizeHeading3: 24,
          fontSizeHeading4: 20,
          colorSplit: '#F5F5F5',
          borderRadius: 10,
          borderRadiusXS: 8,
          borderRadiusLG: 16,
          borderRadiusSM: 12,
          borderRadiusOuter: 5,
          boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.25)',
          colorBgMask: 'rgba(19, 19, 19, 0.4)',
          colorTextBase: '#001D3F',
          colorTextHeading: '#3F434A',
          colorText: '#001D3F',
          colorTextSecondary: '#171832',
          colorTextTertiary: '#8492A6',
          colorTextQuaternary: '#001D3F',
          colorBorder: '#E8E9EB',
          fontFamily: 'Poppins',
          padding: 12,
          controlHeight: 40,
          controlHeightLG: 45
        }
      }}
    >

      <Router>
        <Provider store={store}>
          <UserContainer>
            <Routes />
          </UserContainer>
        </Provider>
      </Router>
    </ConfigProvider>
  )
}

export default App
