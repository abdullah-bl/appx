import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'
import querystring from 'query-string'

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
  const { start, end, active, personId, internal, take = 20, skip = 0 } = req.query

  const appends = await prisma?.append.findMany({
    take: Number(take),
    skip: Number(skip),
    where: {

    },
    include: {
      employee: true,
      branch: true,
      unit: true,
      department: true
    }
  })
  res.json({
    status: 'success',
    message: 'Search Result!',
    query: req.query,
    appends,
  })
})


export default withSessionRoute(handler)