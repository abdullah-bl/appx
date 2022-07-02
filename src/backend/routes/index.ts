import { z } from 'zod';
import { createRouter } from '../createRoute';
import superjson from 'superjson';
import { settingsRoute } from './settings';
import { authRouter } from './auth';
import { userRouter } from './users';
import { adminRouter } from './admin';


export const appRouter = createRouter()
  .transformer(superjson)
  .middleware(({ next, ctx }) => {
    console.log('middleware => ', ctx.user)
    return next()
  })
  // settings router
  .merge('settings.', settingsRoute)
  // auth router
  .merge('auth.', authRouter)
  // users router
  .merge('users.', userRouter)
  // admin routes
  .merge('admin.', adminRouter)
// 

// export type definition of API
export type AppRouter = typeof appRouter;
