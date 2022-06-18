import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'
import { prisma } from 'lib/prisma'
import { withSessionRoute } from 'lib/session'
import { IResponse } from 'types'


const handler = nx<NextApiRequest, NextApiResponse>()

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
  res.send(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>User</title>
        <script>
          print()
        </script>
      </head>
      <body>

        <h1>User</h1>
        <p>
          <strong>ID:</strong> ${user?.id}
        </p>
        <p>
          <strong>Name:</strong> ${user?.name}
        </p>
        <p>
          <strong>Password:</strong> ${user?.password}
        </p>
        <p>
          <strong>Created at:</strong> ${user?.createdAt}
        </p>
        <p>
          <strong>Updated at:</strong> ${user?.updatedAt}
        </p>

      </body>
    </html>
  
  `)
})


export default withSessionRoute(handler)