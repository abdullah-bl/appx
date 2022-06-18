





import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'
import { comparePassword, hashPassword } from 'lib/utils/bcrypt'


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

handler.post(async (req, res) => {
  const { username, oldPassword, newPassword } = req.body
  console.group('change-password', username, oldPassword, newPassword)
  const user = await prisma?.user.findUnique({
    where: { username }
  })

  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'User not found',
    })
    return
  }

  const isValid = user?.password && await comparePassword(oldPassword, user?.password)

  if (!isValid) {
    res.status(401).json({
      status: 'error',
      message: 'Invalid password',
    })
    return
  }

  await prisma?.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: await hashPassword(newPassword),
    }
  })


  res.json({
    status: 'success',
    message: 'Password has been changed',
    user: { ...user, password: undefined },
  })
})


export default withSessionRoute(handler)