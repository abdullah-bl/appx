import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { decodeJwtToken } from "./lib/jwt";
import { prisma } from "./lib/prisma";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you'd might want to do in your ctx fn
  async function getUserFromHeader() {
    if (opts?.req.cookies?.token) {
      const token = opts?.req.cookies?.token
      return await decodeJwtToken(token);
    }
    return null;
  }
  return {
    req: opts?.req,
    res: opts?.res,
    user: await getUserFromHeader() as { id: number, admin: boolean } | null,
    prisma: prisma
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;