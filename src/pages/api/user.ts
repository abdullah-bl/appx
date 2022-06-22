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
  const user = await prisma?.user.findUnique({
    where: {
      id: Number(
        req.session.user?.id
      ),
    }
  })
  // res.setHeader(
  //   'Cache-Control',
  //   'public, s-maxage=10, stale-while-revalidate=59'
  // )
  res.json({
    status: 'success',
    message: 'Get user successful',
    user: { ...user, password: undefined },
  })
})


export default withSessionRoute(handler)