import { http } from "@/utils/http";
import { baseUrlApi } from "./apiUtils";

/** 登录 */
export const getData = (data?: object) => {
  return http.request<any>("get", baseUrlApi("getUser"), { data });
};
