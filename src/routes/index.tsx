import * as Pages from "@/pages";

export const routes = [
  // Home
  { path: "/", component: <Pages.Home /> },

  // Contact
  { path: "/contact", component: <Pages.Contact /> },

    // Shop
  { path: "/shop", component: <Pages.Shop /> },

  //Login
  { path: "/auth/login", component: <Pages.Login /> },

  //Register
  { path: "/auth/register", component: <Pages.Register /> },
];

export default routes;
