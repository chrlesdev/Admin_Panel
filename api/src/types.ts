import { Request } from "express";

export interface AuthenticatedOwner {
  id?: string;
  email?: string;
  role?: string;
}

export interface AuthenticatedAdmin {
  email?: string;
  id?: string;
  role?: string;
}

export interface RequestOwnerId extends Request {
  owner?: AuthenticatedOwner;
}

export interface RequestAdminId extends Request {
  admin?: AuthenticatedAdmin;
}
