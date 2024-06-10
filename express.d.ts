// express.d.ts (create this file in your project root)
import { UserType } from "./type";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
