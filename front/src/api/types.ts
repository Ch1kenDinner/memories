import { AxiosResponse } from "axios";
import { ApiControllers } from "../../../back/controllers/types";
import { ApiRoutes } from "./const";

export type fetchTypes<T extends keyof typeof ApiRoutes> = (
  params: Parameters<typeof ApiRoutes[T]>[0] extends Record<string, any> ? Parameters<typeof ApiRoutes[T]>[0] : any,
	...args
) => Promise<AxiosResponse<Awaited<ReturnType<ApiControllers[T]>>, any>>;
