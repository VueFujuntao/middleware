import React from 'react';
// 路由
import Router from './router.js';

/*
* HashRouter 使用 URL 中的 hash（#）部分去创建路由
* Route 保持与 location 的同步
* Switch 精准匹配URL
*/
import { HashRouter, Route, Switch } from "react-router-dom";

// 状态
/*
* createStore 核心API
* applyMiddleware 对redux的dispacth方法进行封装
* compose写深度嵌套的函数
*/ 
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Provider 用来保持与 store 的更新
import { Provider } from "react-redux";
// redux 合并后的文件
import reducer from "./redux/index.js";

// 状态管理
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

// extends 继承关键字
class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <Switch>
            {/* extends 在位置完全匹配时才应用激活类 */}
            <Route path="/" extends component={Router.Index} />
          </Switch>
        </HashRouter>
      </Provider>
    );
  }

}

export default App;
