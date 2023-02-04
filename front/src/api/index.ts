/* eslint-disable no-labels */
/* eslint-disable no-unused-labels */
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiControllers } from "back/controllers/types";
import { ApiRoutes } from "../api/const";
import { fetchTypes } from "./types";

const BASE_URL =
  window.location.protocol + "//" + window.location.hostname + ":5000";

export const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const profile = localStorage.getItem("profile");
  if (profile && config.headers) {
    config.headers["auth"] = JSON.parse(profile).token;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const { response } = error;
    console.log("response.status :>> ", response?.status ?? "f");
    if (response?.status == 401) {
      localStorage.clear();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

export const fetchGetPosts: fetchTypes<"getPosts"> = (params) => {
  return api.get(ApiRoutes.getPosts(params));
};
export const fetchGetPostsBySearch: fetchTypes<"getPostsBySearch"> = (
  params
) => {
  return api.get(ApiRoutes.getPostsBySearch(params));
};
export const fetchGetPostDetails: fetchTypes<"getPostDetails"> = (params) => {
  return api.get(ApiRoutes.getPostDetails(params));
};

export const myFetch = <T extends keyof typeof ApiRoutes>(
  action: T,
  params?: Parameters<typeof ApiRoutes[T]>[0],
  body?: Record<string, any>
): Promise<AxiosResponse<Awaited<ReturnType<ApiControllers[T]>>>> => {
  switch (action.match(/(get|post|patch|delete)/i)![0]) {
    case "get":
      return api.get<Awaited<ReturnType<ApiControllers[T]>>>(
        ApiRoutes[action](params ?? {})
      );
    case "patch":
      return api.patch<Awaited<ReturnType<ApiControllers[T]>>>(
        ApiRoutes[action](params ?? {}),
        body
      );
    case "delete":
      return api.delete<Awaited<ReturnType<ApiControllers[T]>>>(
        ApiRoutes[action](params ?? {}),
        body
      );
    case "post":
		default:
      return api.post<Awaited<ReturnType<ApiControllers[T]>>>(
        ApiRoutes[action](params ?? {}),
        body
      );
  }
};

// export const myFetch = <T extends keyof typeof ApiRoutes>(
//   action: T,
//   params?: Parameters<typeof ApiRoutes[T]>[0],
//   body?: Record<string, any>
// ) => ({
//   get: api.get<Awaited<ReturnType<ApiControllers[T]>>>(
//     ApiRoutes[action](params ?? {})
//   ),
//   post: api.post<Awaited<ReturnType<ApiControllers[T]>>>(
//     ApiRoutes[action](params ?? {}), body
//   ),
//   patch: api.patch<Awaited<ReturnType<ApiControllers[T]>>>(
//     ApiRoutes[action](params ?? {}), body
//   ),
//   delete: api.delete<Awaited<ReturnType<ApiControllers[T]>>>(
//     ApiRoutes[action](params ?? {}), body
//   ),
// });
