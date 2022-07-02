declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
      username?: string;
      admin?: boolean;
    };
  }
}