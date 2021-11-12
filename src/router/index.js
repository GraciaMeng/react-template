import Home from "../views/Home";

const routes = [{
  key: 'Home',
  path: '/home',
  // element: lazy(() => import('../views/Home')),
  element: ( < Home / > ),
  exact: true,
}]
export default routes;