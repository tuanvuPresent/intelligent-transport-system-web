import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);
const routes = [
    {
        path: "/",
        component: () => import("@/layouts/DashBoardLayout"),
        children: [
            {
                path: "",
                component: () => import("@/views/VehicleManager.vue"),
            },
            {
                path: "vehicle",
                component: () => import("@/views/VehicleManager.vue"),
            },
            {
                path: "tracking-vehicle-map",
                component: () => import("@/views/TrackingVehicleMap.vue"),
            },
        ]
    },
];
const router = new VueRouter({
    mode: "history",
    routes
});
// router.beforeEach((to, from, next) => {
//   const token = AuthStore().token;
//   if (to.path !== "/login") {
//     if (token) {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     if (token) {
//       next("/");
//     } else {
//       next();
//     }
//   }
// });

export default router;
