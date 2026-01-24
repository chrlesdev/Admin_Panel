import { Request } from "express";

export interface AuthenticatedUser {
  email?: string;
  id?: string;
  role?: string;
}

export interface RequestWithUserId extends Request {
  user?: AuthenticatedUser;
}
