





import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'
import { comparePassword, hashPassword } from 'lib/utils/bcrypt'


const handler = nx<NextApiRequest, NextApiResponse<IResponse>>()

handler.use(async (req, res, next) => {
  if (!req.session.user?.admin) {
    res.status(401).json({
      status: 'error',
      message: 'unauthorized',
    })
    return
  }
  next()
})

handler.get(async (req, res) => {

  await prisma?.user.deleteMany({
    where: {
      admin: false,
    }
  })

  await prisma?.employee.deleteMany({})
  await prisma?.append.deleteMany({})
  await prisma?.branch.deleteMany({})
  await prisma?.unit.deleteMany({})
  await prisma?.department.deleteMany({})

  res.json({
    status: 'success',
    message: 'Date has been reset successfully',
  })
})


export default withSessionRoute(handler)