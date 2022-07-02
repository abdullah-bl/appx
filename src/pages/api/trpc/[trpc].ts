import * as trpcNext from '@trpc/server/adapters/next';
import { createContext } from '~/backend/context';
import { appRouter } from '~/backend/routes';



// // export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

// export default withSessionRoute(
//   trpcNext.createNextApiHandler({
//     router: appRouter,
//     createContext,
//   })
// )