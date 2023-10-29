import { AxiosResponse } from 'axios'
import http from '~/http'

export const getUserByToken = (_token: string): Promise<AxiosResponse> => {
  return http('/user/getUserByToken', 'get')
}
