import { routesWithPages } from "../providers/routesWithPages";

export const getPathRoute = (path: string) => {
  const target = routesWithPages.find((r) => r.route.match(path));
  if (target) {
    const params = target.route.match(path);
    return {
      page: target.page,
      route: target.route,
      params,
    };
  }
  return null;
};

export const render = (path: string) => {
  let result = "<h1>404</h1>";

  const pathRoute = getPathRoute(path);

  if (pathRoute) {
    result = pathRoute.page(pathRoute.params);
  }

  document.querySelector("#app").innerHTML = result;
};

export const goTo = (path: string) => {
  window.history.pushState({ path }, path, path);
  render(path);
};

export const getRouterParams = () => {
  const { pathname } = new URL(window.location.href);
  return getPathRoute(pathname);
};

const initRouter = () => {
  window.addEventListener("popstate", () => {
    render(new URL(window.location.href).pathname);
  });
  document.querySelectorAll('[href^="/"]').forEach((el) => {
    el.addEventListener("click", (env: any) => {
      env.preventDefault();

      const { pathname: path } = new URL(env.target.href);
      goTo(path);
    });
  });
  render(new URL(window.location.href).pathname);
};

export default initRouter;
