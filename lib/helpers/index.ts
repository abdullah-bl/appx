
import { prisma } from '../prisma'


export const getSearchResults = async (keyword: string, take?: number, skip?: number) => {

  const users = await prisma.user.findMany({
    take: take || 20,
    skip: skip || 0,
    where: {
      OR: [
        {
          name: {
            contains: keyword,
          }
        },
        {
          username: {
            contains: keyword,
          }
        }
      ]
    }
  })

  return users.map((user) => ({ ...user, password: undefined }))
}


export const getUsers = async ({ take = 20, skip = 0, q }: {
  take?: number,
  skip?: number,
  q: string
}) => {
  const users = await prisma.user.findMany({
    take: take || 20,
    skip: skip || 0,
    where: {
      OR: [
        {
          name: {
            contains: String(q),
          }
        },
        {
          username: {
            contains: String(q),
          }
        }
      ]
    }
  })
  return JSON.parse(JSON.stringify(users.map((user) => ({ ...user, password: undefined }))))
}


