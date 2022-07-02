import fs from 'fs'
import { z } from 'zod'
import { createRouter } from '../createRoute'


export const settingsRoute = createRouter()
  .query('get', {
    async resolve({ ctx }) {
      return {}
    }
  })
  .middleware(({ next, ctx }) => {
    console.log('admin only')
    return next()
  })
  .mutation('set', {
    input: z.object({
      title: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      return {}
    }
  })