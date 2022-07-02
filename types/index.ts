import { User } from "@prisma/client"

export interface iResponse {
  success: boolean
  message: string
  [key: string]: any
}

export interface LoginTypes extends iResponse {
  user?: User | undefined
}
