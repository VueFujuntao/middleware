import AsyncComponent from './config/asyncComponent.jsx';

const Router = {
  // AsyncComponent 异步组件 通过异步import 注释 webpack 解析生成对应的文件名
  EntranceGuard: AsyncComponent(() => import( /* webpackChunkName: "EntranceGuard" */ "./views/entranceGuard/entranceGuard.jsx")),
  Index: AsyncComponent(() => import( /* webpackChunkName: "Index" */ './views/index/index.jsx'))
}

export default Router;