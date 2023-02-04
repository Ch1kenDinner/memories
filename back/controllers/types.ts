import { ApiRoutes } from "../types";
import { AuthControllers } from "./auth";
import { PostControllers } from "./post";

export interface IControllers
  extends Partial<Record<keyof typeof ApiRoutes, (...args) => any>> {}

export type ApiControllers = typeof PostControllers & typeof AuthControllers