import jwt from 'jsonwebtoken'
import { env } from './env';


export const decodeJwtToken = async (token: string) => {
  try {
    return jwt.verify(token, env.JWT_SECRET)
  } catch (e) {
    return null
  }
}

export const createJwtToken = (user: any) => jwt.sign(user, env.JWT_SECRET, {
  expiresIn: '10 days',
})
