// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  // callbacks: {
  //   async authorized({ token }) {
  //     return !!token;
  //   },
  // },
});

export const config = {
  matcher: ["/applications/new", "/applications/:id+/edit", "/applications/:id+", "/analysis"],
};

