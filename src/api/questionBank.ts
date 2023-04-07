import { http } from "@/utils/http";
import { baseUrlApi } from "./apiUtils";

/** 分页查询题目菜单列表 */
export const getMenuPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getMenuPagination"), { data });
};
