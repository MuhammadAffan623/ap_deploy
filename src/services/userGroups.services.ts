// import http from "~/http";
// import { AxiosResponse } from "axios";

import { getMockUserGroups } from '~/mocks'

export const getUserGroups = (count: number): Promise<IUserGroup[]> => {
  return new Promise((resolve) => {
    resolve(getMockUserGroups(count))
  })
}
