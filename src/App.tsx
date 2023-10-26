import { ConfigProvider } from 'antd'
import UserContainer from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from './routes'
import theme from './theme.json'

// const customeTheme: ThemeConfig = {
//   components: {
//     Input: {
//       colorBorder: 'rgb(232, 233, 235)'
//     },
//     Tabs: {
//       colorText: '#8A9099',
//       colorBorderSecondary: '#E8E9EB',
//       colorFillAlter: 'rgba(0, 0, 0, 0.02)',
//       borderRadius: 10
//     },
//     Table: {
//       controlItemBgActiveHover: 'rgb(44, 241, 241)',
//       rowSelectedBg: 'rgb(95, 145, 185)',
//       headerSplitColor: 'rgb(255, 255, 255)',
//       headerColor: 'rgba(147, 145, 145, 0.88)',
//       borderColor: 'rgb(0, 0, 0)'
//     },
//     // Menu: {
//     // controlHeight:
//     // },
//     Form: {}
//   },
//   token: {
//     colorBgBase: 'tomato',
//     colorBgLayout: '#F8F8F8',
//     colorBgContainer: 'white',
//     colorBgElevated: 'white',
//     colorPrimary: '#304FFD',
//     colorLink: '#304FFD',
//     colorSuccess: '#49C96D',
//     colorError: '#FD7972',
//     colorWarning: '#FF965D',
//     fontSize: 14,
//     fontSizeHeading1: 30,
//     fontSizeHeading2: 26,
//     fontSizeHeading3: 24,
//     fontSizeHeading4: 20,
//     colorSplit: '#F5F5F5',
//     borderRadius: 10,
//     borderRadiusXS: 8,
//     borderRadiusLG: 16,
//     borderRadiusSM: 12,
//     borderRadiusOuter: 5,
//     boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.25)',
//     colorBgMask: 'rgba(19, 19, 19, 0.4)',
//     colorTextBase: '#001D3F',
//     colorTextHeading: '#3F434A',
//     colorText: '#001D3F',
//     colorTextSecondary: '#171832',
//     colorTextTertiary: '#8492A6',
//     colorTextQuaternary: '#001D3F',
//     colorBorder: '#F4F4F4',
//     fontFamily: 'Poppins',
//     padding: 12,
//     controlHeightLG: 45
//   }
// }

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
