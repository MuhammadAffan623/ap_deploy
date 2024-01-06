import { Navigate } from 'react-router-dom'

interface IProtectedRouteProps {
  component: ReactNode
  navLink: string
}

const ProtectedRoute = ({ component: Component, navLink, ...rest }: IProtectedRouteProps) => {
  if (!localStorage.getItem('token')) {
    return <Navigate to={navLink} replace />
  }

  return <Component {...rest} />
}

export default ProtectedRoute
