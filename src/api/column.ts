import { http } from "@/utils/http";
import { baseUrlApi } from "./apiUtils";

/** 分页查询专栏列表 */
export const getColumnPagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getColumnPagination"), { data });
};

/**
 * 添加专栏
 * @param data
 */
export const addColumn = (data?: object) => {
  return http.request<any>("post", baseUrlApi("addColumn"), { data });
};

/**
 * 更新专栏
 * @param data
 */
export const updateColumn = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateColumn"), { data });
};

/**
 * 删除专栏
 * @param data
 */
export const deleteColumn = (data?: object) => {
  return http.request<any>("post", baseUrlApi("deleteColumn"), { data });
};

/**
 * 获取所有专栏
 * @param data
 */
export const getAllColumn = (data?: object) => {
  return http.request<any>("get", baseUrlApi("getAllColumn"), { data });
};

/** 分页查询文章列表 */
export const getArticlePagination = (data?: object) => {
  return http.request<any>("post", baseUrlApi("getArticlePagination"), { data });
};

/**
 * 添加文章
 * @param data
 */
export const addArticle = (data?: object) => {
  return http.request<any>("post", baseUrlApi("addArticle"), { data });
};

/**
 * 更新文章
 * @param data
 */
export const updateArticle = (data?: object) => {
  return http.request<any>("post", baseUrlApi("updateArticle"), { data });
};

/**
 * 删除文章
 * @param data
 */
export const deleteArticle = (data?: object) => {
  return http.request<any>("post", baseUrlApi("deleteArticle"), { data });
};


