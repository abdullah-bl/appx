import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { comparePassword, hashPassword } from "~/backend/lib/bcrypt";
import { createRouter } from "../createRoute";
import { createJwtToken } from "../lib/jwt";
import { prisma } from '../lib/prisma'



export const adminRouter = createRouter()
  .middleware(({ next, ctx }) => {
    if (!ctx.user || !ctx.user.admin) {
      throw new TRPCError({ code: 'UNAUTHORIZED', message: "Admin Only" });
    }
    return next()
  })
  .query('isAdmin', {
    async resolve({ ctx }) {
      return ctx.user && ctx.user.admin
    }
  })
  .mutation('deleteUser', {
    input: z.object({
      userId: z.number()
    }),
    async resolve({ input, ctx }) {
      const deleted = await ctx.prisma.user.delete({
        where: {
          id: input.userId
        }
      })
      return {
        deleted
      }
    }
  })
  .mutation('createUser', {
    input: z.object({
      name: z.string().optional(),
      username: z.string(),
      password: z.string(),
      admin: z.boolean(),
    }),
    async resolve({ input, ctx }) {
      const { name, username, password, admin } = input;
      const user = await prisma.user.create({
        data: {
          name: name || username,
          username,
          password: await hashPassword(password),
          admin,
        },
      });
      return user;
    }
  })
  .mutation('changeUserPassword', {
    input: z.object({
      userId: z.number(),
      newPassword: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { userId } = input;
      const user = await prisma.user.findUnique({
        where: {
          id: userId
        },
      })
      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      const newUserPassword = await prisma.user.update({
        where: { id: userId },
        data: {
          password: await hashPassword(input.newPassword)
        }
      })
      return {
        user: {
          ...newUserPassword,
          password: undefined
        },
        message: 'Password changed',
      }
    }
  })

export type AdminRouter = typeof adminRouter