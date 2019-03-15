import AsyncComponent from './asyncComponent.jsx';

const Router = {
  EntranceGuard: AsyncComponent(() =>
    import( /* webpackChunkName: "EntranceGuard" */ "./views/entranceGuard/entranceGuard.jsx")
  )
}

export default Router;
