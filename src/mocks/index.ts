import { faker } from '@faker-js/faker'

export const getMockUsers = (
  count: number,
  isActive: boolean | 'random',
  isBlocked: boolean | 'random'
): Partial<IUser>[] => {
  return Array.from({ length: count }, () => {
    return {
      _id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      avatarUrl: faker.image.avatar(),
      createdAt: faker.date.past().toString(),
      updatedAt: faker.date.recent().toString(),
      email: faker.internet.email(),
      role: 'user',
      isActive: isActive !== 'random' ? faker.datatype.boolean() : !!isActive,
      isBlocked: isBlocked !== 'random' ? faker.datatype.boolean() : !!isBlocked,
      phoneNumber: faker.phone.number(),
      username: faker.internet.userName()
    }
  })
}

export const getMockUserGroups = (count: number): IUserGroup[] => {
  return Array.from({ length: count }, () => {
    return {
      _id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      users: getMockUsers(faker.datatype.number({ min: 1, max: 11 }), false, false),
      createdAt: faker.date.past().toString(),
      updatedAt: faker.date.recent().toString()
    }
  })
}

export const getMockForms = (count: number, isCompleted: boolean | 'random'): Partial<IForm>[] => {
  return Array.from({ length: count }, () => {
    return {
      _id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      owner: faker.name.lastName(),
      createdAt: faker.date.past().toString(),
      updatedAt: faker.date.recent().toString(),
      version: `v${faker.datatype.float({ max: 50, precision: 0.01 })}`,
      status: isCompleted !== 'random' ? faker.datatype.boolean() : !!isCompleted
    }
  })
}

export const getMockBlueForms = (count: number, isCompleted: boolean | 'random'): Partial<IForm>[] => {
  return Array.from({ length: count }, () => {
    return {
      _id: faker.datatype.uuid(),
      name: faker.name.firstName(),
      tags: isCompleted !== 'random' ? faker.datatype.boolean() : !!isCompleted,
      sheet:  faker.datatype.number(),
      updatedAt: faker.date.recent().toString(),
      version: `v${faker.datatype.float({ max: 50, precision: 0.01 })}`,
      status: isCompleted !== 'random' ? faker.datatype.boolean() : !!isCompleted
    }
  })
}

export const getMockLibraryForms = (
  count: number,
  isCompleted: boolean | 'random'
): Partial<IForm>[] => {
  return Array.from({ length: count }, () => {
    return {
      _id: faker.datatype.uuid(),
      title: faker.name.firstName(),
      category: faker.animal.type(),
      createdAt: faker.date.past().toString(),
      updatedAt: faker.date.recent().toString(),
      status: isCompleted !== 'random' ? faker.datatype.boolean() : !!isCompleted
    }
  })
}
export const getMocksLibraryView = (length?: number) => {
  const arr = new Array(length ?? 1)
  return [...arr].map(() => faker.lorem.words(4))
}
