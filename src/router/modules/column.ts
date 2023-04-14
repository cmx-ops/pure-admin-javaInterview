export default {
  path: "/column",
  meta: {
    title: "专栏管理",
    icon: "home",
    rank: 10
  },
  children: [
    {
      path: "/column/column/index",
      name: "ColumnPage",
      component: () => import("@/views/column/column/index.vue"),
      meta: {
        title: "专栏管理",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/column/columnArticle/index",
      name: "ColumnArticle",
      component: () => import("@/views/column/columnArticle/index.vue"),
      meta: {
        title: "文章管理",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    }
  ]
} as RouteConfigsTable;
