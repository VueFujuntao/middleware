## Available Scripts

In the project directory, you can run:

### `npm start`

在开发模式下运行应用程序.<br>
打开 [http://localhost:3000](http://localhost:3000) 在浏览器中查看它

### `npm run build`

将生产应用程序构建到`build`文件夹,它正确地将 React 捆绑在生产模式中并优化构建以获得最佳性能

全局安装 以管理者身份打开 CMD 执行 `npm i -g serve`<br>
在项目路径下 执行 `serve -s build` 即可脱离编译局 查看项目 [http://localhost:5000](http://localhost:5000)

### `npm run eject`

**注意：这是单向操作。 一旦你'弹出'，你就不能回去了！**

如果您对构建工具和配置选择不满意，可以随时“弹出”

### 开发说明

请使用 less 预处理语言编写 css 样式, 使用嵌套的方式<br>
数据请求操作在redux里操作<br>
任何跟数据有关的操作请在`智能组件`写，通过传值方式传递给`木偶组件`<br>

### 简述依赖

- React 版本：16.8.4
- React-dom 版本: 16.8.4
- React-redux 版本: 6.0.1 状态管理
- Redux 版本: 4.0.1 状态管理
- Redux-thunk 版本: 2.3.0 异步状态管理
- React-router-dom 版本: 4.3.1 路由 [https://github.com/ReactTraining/react-router](https://github.com/ReactTraining/react-router)
- Axios 版本: 0.18.0 网络请求 [https://www.kancloud.cn/yunye/axios/234845](https://www.kancloud.cn/yunye/axios/234845)
- Antd 版本: 3.15.0 蚂蚁金服 UI [https://ant.design/index-cn](https://ant.design/index-cn)
- Immutable 版本: 4.0.0-rc.12 渲染性能 [https://www.npmjs.com/package/immutable](https://www.npmjs.com/package/immutable)
- Prop-types 版本: 15.7.2 属性检测 [https://www.npmjs.com/package/prop-types](https://www.npmjs.com/package/prop-types)
- babel-plugin-transform-decorators-legacy 版本: 1.3.5 装饰性插件
- less less-loader 版本: 3.9.0 CSS 预处理语言 [https://less.bootcss.com/#](https://less.bootcss.com/#)

### 项目结构

- config:项目（webpack）配置文件
- node_modules: 项目依赖库
- scripts: 项目执行脚本
- src: 开发源码包
  - assets:项目静态资源文件
  - components: 项目组件文件
  - redux：项目数据池所在
    - module: 数据文件存放
    - index.js：数据池对外入口
  - views：项目页面文件
  - App.js: 项目入口文件
  - index.js：项目全局引入文件
  - router.js: 路由管理
  - asyncComponent.jsx: 高阶组件 懒加载
- package.json: 依赖管理 环境配置
- package-lock.json: 依赖锁
- gitgnore: 禁止上传 GIT

### 项目配置

`./package.json`
```
"babel": {
  "plugins": [
      // 按需引入UI库
      [
      "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": "css"
        }
      ],
      // 修饰器 配置
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
  ]
}
```

`./src/index.js`
```
// 热重载
const rootEl = document.getElementById('root')

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp / > ,
      rootEl
    );
  });
}

ReactDOM.render( < App / > , rootEl);
```

`./config/webpack.config.js`
```
// 配置 less语法

// 43
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;
// 462
{
  test: lessRegex,
  exclude: lessModuleRegex,
  use: getStyleLoaders({ importLoaders: 2 }, 'less-loader'), // 注意第二个参数
},
{
  test: lessModuleRegex,
  use: getStyleLoaders(
  {
    importLoaders: 2,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent,
  },
  'less-loader' // 注意第二个参数
  )
}
// 110
if (preProcessor === 'less-loader') {
  loaders.push({
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: isEnvProduction && shouldUseSourceMap,
      javascriptEnabled: true // 解决上文报错
    },
  });
} else {
  loaders.push({
    loader: require.resolve(preProcessor),
    options: {
      sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
    ,
  });
}
```
### React class
```
import React from "react";
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
// PropTypes props类型检查
import PropTypes from 'prop-types';
import './index.less';

// @方法 ：装饰器写法
@connect(
  state => state.one
)
class EntranceGuard extends React.Component {
  // 以随意为每一个属性指定类型。这对于我们检查和处理属性的意外赋值非常有用。
  static propTypes = {
    type: PropTypes.string
  }
  /*
    构造函数 添加一个类构造函数来初始化状态 this.state
    注意传递 props 到基础构造函数的
  */
  constructor(props) {
    super(props)
    /*
    this.state 定义数据,数据是响应的
    修改数据,例子： this.setstate({date: 1})
    */ 
    this.state = {date: new Date()}
  }
  // 组件挂载前
  componentWillMount() {
  }
  // 组件挂载后
  componentDidMount() {
  }
  // 组件销毁前
  componentWillUnmount() {
  }
  // props state 更新 此钩子函数将被调用 接收两个参数，更新后的props, state
  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  
  render() {
    /*
      最外层需要一个元素包裹
      写类 需要 className 因为 class 与 es class语法糖 冲突
    */
    return (
      <div className="less">
        <input type="text" value={this.state.date.toLocaleTimeString()}/>
      </div>
    );
  }
}

export default EntranceGuard;

```