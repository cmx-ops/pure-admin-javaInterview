export default {
  path: "/questionBank",
  meta: {
    title: "题库管理",
    icon: "home",
    rank: 9
  },
  children: [
    {
      path: "/questionBank/menu/index",
      name: "MenuPage",
      component: () => import("@/views/questionBank/menu/index.vue"),
      meta: {
        title: "菜单管理",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/questionBank/question/index",
      name: "Question",
      component: () => import("@/views/questionBank/question/index.vue"),
      meta: {
        title: "题目管理",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    },
    {
      path: "/questionBank/questionAnswer/index",
      name: "QuestionAnswer",
      component: () => import("@/views/questionBank/questionAnswer/index.vue"),
      meta: {
        title: "答案管理",
        roles: ["admin", "common"],
        auths: ["btn_add", "btn_edit", "btn_delete"]
      }
    }
  ]
} as RouteConfigsTable;
