import { http } from "@/utils/http";
import { baseUrlApi } from "./apiUtils";

/** 分页查询题目菜单列表 */
export const getMenuPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getMenuPagination"), { data });
};


/** 分页查询题目菜单列表 */
export const getAllMenu = (data?: object) => {
  return http.request<any>("get", baseUrlApi("getAllMenu"), { data });
};


/** 分页查询题目题目列表 */
export const getQuestionPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getQuestionPagination"), { data });
};

