export const getToken = () => {
  return localStorage.getItem('jwt_access_token')
}

export const getInitials = (str: string) => {
  const firstChar = str?.charAt(0).toUpperCase()
  return firstChar
}
