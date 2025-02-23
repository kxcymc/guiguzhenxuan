// 配置children的path一定要写全！拼接好父级的路径！否则路径错误

const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
    name: "login",
    meta: {
      title: "登录",
      selected: false,
    },
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import("@/views/HomePage.vue"),
    meta: {
      selected: true,
    },
    children:[
      {
        path: '/home',
        component: () => import("@/views/secondHome/HomeContent.vue"),
        name: "layout",
        meta: {
          title: "首页",
          icon: 'House',
          selected: true,
        },
      },
    ]
  },
  
  {
    path: "/screen",
    component: () => import("@/views/DataScreen.vue"),
    meta: {
      title: "数据大屏",
      icon: "Monitor",
      selected: true,
    },
  },
  {
    path: "/acl",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      title: "权限管理",
      icon: "Lock",
      selected: true,
    },
    redirect:'/acl/user',
    children: [
      {
        path: "/acl/user",
        component: () => import("@/views/secondHome/UserControl.vue"),
        meta: {
          title: "用户管理",
          icon: "User",
          selected: true,
        },
      },
      {
        path: "/acl/role",
        component: () => import("@/views/secondHome/RoleControl.vue"),
        meta: {
          title: "角色管理",
          icon: "UserFilled",
          selected: true,
        },
      },
      {
        path: "/acl/permission",
        component: () =>
          import("@/views/secondHome/PermitControl.vue"),
        meta: { 
          title: "菜单管理",
          icon: "Menu",
          selected: true,
        },
      },
    ],
  },
  {
    path: "/manage",
    component: () => import("@/views/HomePage.vue"),
    meta: {
      title: "商品管理",
      icon: "Goods",
      selected: true,
    },
    redirect:'/manage/brand',
    children: [
      {
        path: "/manage/brand",
        component: () =>
          import("@/views/secondHome/BrandManage.vue"),
        meta: {
          title: "品牌管理",
          icon: "ShoppingCart",
          selected: true,
        },
      },
      {
        path: "/manage/nature",
        component: () =>
          import("@/views/secondHome/NatureManage.vue"),
        meta: {
          title: "属性管理",
          icon: "UserFilled",
          selected: true,
        },
      },
      {
        path: "/manage/spu",
        component: () =>
          import("@/views/secondHome/SpuManage.vue"),
        meta: {
          title: "SPU管理",
          icon: "Menu",
          selected: true,
        },
      },
      {
        path: "/manage/sku",
        component: () =>
          import("@/views/secondHome/SkuManage.vue"),
        meta: {
          title: "SKU管理",
          icon: "Menu",
          selected: true,
        },
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404Page.vue"),
    name: "404",
    meta: {
      title: "无法访问",
      selected: false,
    },
  },
  {
    path: "/:patchMatch(.*)*",
    redirect: "/404",
    name: "Any",
    meta: {
      title: "链接错误重定向",
      selected: false,
    },
  },
];

export default constantRoutes;
