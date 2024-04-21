// export const baseUrl =
//   import.meta.env.VITE_APPLICATION_STATUS === 'development'
//     ? import.meta.env.VITE_DEVELOPMENT_BASE_URL
//     : import.meta.env.VITE_PRODUCTION_BASE_URL

export const baseUrl = 'https://apsone.atlanticpipe.us/api/v1'

export const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem('token') ?? ''
  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  return headers
}
