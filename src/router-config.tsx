import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import Header from "./pages/Header";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/User/Create";
import Delete from "./pages/User/Delete";
import Profile from "./pages/User/Profile";
import Update from "./pages/User/Update";
import Contacts from "./pages/User/User";
import View from "./pages/User/View";
import axios from "axios";
const rootRoute = createRootRoute({
  component: () => {
    if (!navigator.cookieEnabled) {
   return <div className="text-4xl text-center">Cookies are currently disabled in your browser. Please enable cookies to use this website.</div>
}
    return (<>
      <Toaster/>
      <Outlet />
    </>)
  },
});

const landingPageRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: Intro,
});

const loggingPageRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  component: Login,
});

const registerPageRoute = createRoute({
  path: "/register",
  getParentRoute: () => rootRoute,
  component: Register,
});

const globalStaticRoute = createRoute({
  id: "staticGlobalPage",
  getParentRoute: () => rootRoute,
  component: Header,
});

const contactsPageLayout = createRoute({
  path: "/contacts",
  getParentRoute: () => globalStaticRoute,
  component: Contacts,
});

const contactUserCreatePage = createRoute({
  path: "create",
  getParentRoute: () => contactsPageLayout,
  component: Create,
});
const contactUserViewPage = createRoute({
  path: "$id/view",
  getParentRoute: () => contactsPageLayout,
  component: View,
  loader : async ({ params }) => {
    const response = await axios.get(`/contact/${params.id}`);
    return response.data.user;
  }
});
const contactUserUpdatePage = createRoute({
  path: "$id/update",
  getParentRoute: () => contactsPageLayout,
  component: Update,
  loader : async ({ params }) => {
    const response = await axios.get(`/contact/${params.id}`);
    return response.data.user;
  }
});
const contactUserDeletePage = createRoute({
  path: "$id/delete",
  getParentRoute: () => contactsPageLayout,
  component: Delete,
});

const userProfilePageLayout = createRoute({
  path: "profile",
  getParentRoute: () => globalStaticRoute,
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  landingPageRoute,
  loggingPageRoute,
  registerPageRoute,
  globalStaticRoute.addChildren([
    contactsPageLayout.addChildren([
      contactUserViewPage,
      contactUserCreatePage,
      contactUserUpdatePage,
      contactUserDeletePage,
    ]),
    userProfilePageLayout,
  ]),
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
