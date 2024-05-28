export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/applications/new", "/applications/:id+/edit", "/applications/:id+", "/analysis"],
};
