import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { comparePassword, hashPassword } from "~/backend/lib/bcrypt";
import { createRouter } from "../createRoute";
import { createJwtToken } from "../lib/jwt";
import { prisma } from '../lib/prisma'



export const userRouter = createRouter()
  .query('me', {
    async resolve({ ctx }) {
      const { user } = ctx;
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
      }
      const _user = await prisma.user.findUnique({ where: { id: user.id as number } })

      if (!_user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      return {
        ..._user,
        password: undefined
      }
    }
  })
  .mutation('update', {
    input: z.object({
      name: z.string().optional(),
      username: z.string(),
      password: z.string(),
      admin: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      const { user } = ctx;
      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Unauthorized' })
      }
      const _user = await prisma.user.findUnique({ where: { id: user.id as number } })

      if (!_user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      }

      const newUser = await prisma.user.update({
        where: { id: user.id as number },
        data: {
          ...input,
          password: input.password ? await hashPassword(input.password) : undefined
        }
      })
      return {
        ...newUser,
        password: undefined
      }
    }
  })