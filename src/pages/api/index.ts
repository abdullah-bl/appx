import { NextApiRequest, NextApiResponse } from "next"




const handler = (req: NextApiRequest, res: NextApiResponse) => {

  res.send('hello')
}

export default handler