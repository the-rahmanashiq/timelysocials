import express from "express";
import { userRoutes } from "../user/user.route";
import { workSpaceRoutes } from "../workspace/workspace.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/workspace",
    route: workSpaceRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
