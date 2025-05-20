import { createRouter, createWebHashHistory } from "vue-router";
import { auth } from "@/firebase";
import Simulator from "@/views/SimulatorView.vue";
import ResultsView from "@/views/ResultsView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import HistoryView from "@/views/HistoryView.vue";

const routes = [
  {
    path: "/",
    name: "Simulator",
    component: Simulator
  },
  {
    path: "/results",
    name: "Results",
    component: ResultsView,
    meta: { requiresAuth: false }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView
  },
  {
    path: "/register",
    name: "Register", 
    component: RegisterView
  },
  {
     path: "/history",
     component: HistoryView,
     name: "History",
     meta: { requiresAuth: true },
    }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "hover:text-neutral-600 decoration-neutral-600",
  linkExactActiveClass: "underline underline-offset-8",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else {
    next();
  }
});

export const updateUrlQuery = (paramValuePair: object) => {
  const queryParams = { ...router.currentRoute.value.query };
  for (const [param, value] of Object.entries(paramValuePair)) {
    queryParams[param] = value;
  }
  router.push({ query: queryParams });
};

export const clearUrlQuery = () => {
  router.push({ query: undefined });
};

export default router;
