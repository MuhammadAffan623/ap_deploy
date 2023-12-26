import { Navigate } from 'react-router-dom'
import { useUserSelector } from '~/store/hooks'

interface IProtectedRouteProps {
  component: ReactNode
  navLink: string
}

const ProtectedRoute = ({ component: Component, navLink, ...rest }: IProtectedRouteProps) => {
  const { user, token } = useUserSelector()

  if (!(user?._id && token)) {
    return <Navigate to={navLink} replace />
  }

  return <Component {...rest} />
}

export default ProtectedRoute
