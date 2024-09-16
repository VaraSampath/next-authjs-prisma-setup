import { authRoutes, protectedRoutes, publicRoutes } from "./lib/routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  if (publicRoutes.includes(pathname)) {
    return;
  }

  if (authRoutes.includes(pathname) && isLoggedIn) {
    return Response.redirect(new URL("/", nextUrl));
  }

  if (protectedRoutes.includes(pathname) && !isLoggedIn) {
    return Response.redirect(new URL("/login", nextUrl));
  }
});
