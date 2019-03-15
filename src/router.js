import AsyncComponent from './config/asyncComponent.jsx/index.js';

const Router = {
  EntranceGuard: AsyncComponent(() => import( /* webpackChunkName: "EntranceGuard" */ "./views/entranceGuard/entranceGuard.jsx")),
  Index: AsyncComponent(() => import( /* webpackChunkName: "Index" */ './views/index/index.jsx'))
}

export default Router;
