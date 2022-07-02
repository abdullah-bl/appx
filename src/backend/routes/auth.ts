import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { comparePassword, hashPassword } from "~/backend/lib/bcrypt";
import { createRouter } from "../createRoute";
import { createJwtToken } from "../lib/jwt";
import { prisma } from '../lib/prisma'



export const authRouter = createRouter()
  .mutation('changePassword', {
    input: z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
    }),
    async resolve({ input, ctx }) {
      const { user } = ctx

      if (!user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' })
      }

      const { oldPassword, newPassword } = input
      const _user = await prisma.user.findUnique({
        where: {
          id: user.id
        }
      })

      if (!_user) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }

      const isValid = _user && await comparePassword(oldPassword, _user.password as string)
      if (!isValid) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid password" })
      }

      const newUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          password: await hashPassword(newPassword)
        }
      })
      return {
        ...newUser,
        password: undefined
      }
    }
  })
  .mutation('refreshToken', {
    input: z.object({
      refreshToken: z.string()
    }),
    async resolve({ input, ctx }) {
      // const { refreshToken } = input;
      // const { user } = ctx;
      // if (!user) {
      //   throw new TRPCError('Unauthorized', 401);
      // }
      // const token = await prisma.refreshToken.findOne({
      //   where: {
      //     token: refreshToken,
      //     user: {
      //       id: user.id
      //     }
      //   }
      // });
      // if (!token) {
      //   throw new TRPCError('Unauthorized', 401);
      // }
      // return {
      //   token: createJwtToken(user)
      // };
      return {
        refreshToken: "refreshToken"
      }
    }
  })
  .mutation('login', {
    input: z.object({
      username: z.string().nullish(),
      password: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const user = await prisma.user.findUnique({
        where: {
          username: input.username as string,
        }
      })

      if (!user) {
        throw new TRPCError({ code: 'NOT_FOUND', message: 'الرجاء التأكد من اسم المستخدم وكلمة المرور' })
      }

      const isValid = user.password && await comparePassword(input.password as string, user.password)

      if (!isValid) {
        throw new TRPCError({ code: 'BAD_REQUEST', message: 'كلمة المرور غير صحيحة' })
      }

      const token = createJwtToken({
        id: user.id,
        admin: user.admin,
      })

      return {
        success: true,
        token
      }
    }
  })

export type AuthRouter = typeof authRouter