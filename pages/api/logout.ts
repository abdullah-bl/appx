import { withSessionRoute } from 'lib/session'
import type { NextApiRequest, NextApiResponse } from 'next'
import nx from 'next-connect'



const handler = nx<NextApiRequest, NextApiResponse>()



handler.get(async (req, res) => {
  req.session.destroy()
  res.status(200).json({
    message: 'تم تسجيل الخروج بنجاح',
  })
})


export default withSessionRoute(handler)