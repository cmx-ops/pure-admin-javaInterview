import { http } from "@/utils/http";
import { baseUrlApi } from "./apiUtils";

/** 分页查询题目菜单列表 */
export const getMenuPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getMenuPagination"), { data });
};

/**
 * 添加菜单
 * @param data
 */
export const addMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("addMenu"), { data });
};

export const updateMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateMenu"), { data });
};

export const deleteMenu = (data?: object) => {
  return http.request<any>("post", baseUrlApi("deleteMenu"), { data });
};

/** 分页查询题目菜单列表 */
export const getAllMenu = (data?: object) => {
  return http.request<any>("get", baseUrlApi("getAllMenu"), { data });
};

/** 分页查询题目题目列表 */
export const getQuestionPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getQuestionPagination"), { data });
};

/** 分页查询题目题目列表 */
export const addQuestion = (data?: object) => {
  return http.request<any>("post", baseUrlApi("addQuestion"), { data });
};

/** 更新题目 */
export const updateQuestion = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateQuestion"), { data });
};
/** 删除题目 */
export const deleteQuestion = (data?: object) => {
  return http.request<any>("post", baseUrlApi("deleteQuestion"), { data });
};

export const getQuestionAnswerPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getQuestionAnswerPagination"), { data });
};

export const getQuestionAnswerContentByQuestionId = (data?: object) => {
  return http.request<any>("get", baseUrlApi("getQuestionAnswerContentByQuestionId/"+data), { data });
};

