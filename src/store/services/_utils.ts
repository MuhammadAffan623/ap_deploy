export const baseUrl =
  import.meta.env.VITE_APPLICATION_STATUS === 'development'
    ? import.meta.env.VITE_DEVELOPMENT_BASE_URL
    : import.meta.env.VITE_PRODUCTION_BASE_URL

export const prepareHeaders = (headers: Headers, { getState }: any) => {
  console.log('getState', getState())
  const token = getState()?.user?.token ?? ''
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}
