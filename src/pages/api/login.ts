import { withSessionRoute } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { IResponse } from 'types'
import { prisma } from 'lib/prisma'
import { comparePassword } from 'lib/utils/bcrypt'

const handler = nx<NextApiRequest, NextApiResponse<IResponse>>()


handler.post(async (req, res) => {
  const { username, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      username,
    }
  })

  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'الرجاء التأكد من اسم المستخدم وكلمة المرور',
    })
    return
  }


  const isValid = user.password && await comparePassword(password, user.password)
  if (!isValid) {
    res.status(401).json({
      status: 'error',
      message: 'كلمة المرور غير صحيحة',
    })
    return
  }

  // set session
  req.session.user = {
    id: user.id,
    username: user.username,
    admin: user.admin,
  }
  // save user to session
  await req.session.save()
  res.status(200).json({
    status: 'success',
    message: 'تم تسجيل الدخول بنجاح',
    user: {
      ...user,
      password: undefined,
    }
  })
})


export default withSessionRoute(handler)