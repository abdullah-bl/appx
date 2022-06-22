import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'


const handler = nx<NextApiRequest, NextApiResponse<IResponse>>()

handler.use(async (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({
      status: 'error',
      message: 'User not logged in',
    })
    return
  }
  next()
})

handler.get(async (req, res) => {
  const { keyword, take = 20, skip = 0 } = req.query
  const users = await prisma?.user.findMany({
    take: Number(take),
    skip: Number(skip),
    where: {
      OR: [
        keyword ? {
          username: {
            contains: String(keyword)
          },
        } : {},
        keyword ? {
          name: {
            contains: String(keyword)
          }
        } : {},
        keyword ? {
          color: {
            contains: String(keyword)
          }
        } : {}
      ]
    }
  })
  res.json({
    status: 'success',
    message: 'Search Result!',
    users: users.map(user => ({ ...user, password: undefined })),
    query: req.query
  })
})


export default withSessionRoute(handler)