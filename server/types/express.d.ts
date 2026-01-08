declare global {
  namespace Express {
    interface Request {
      // Add the user property here
      user?: User;
    }
  }
}
export {};
