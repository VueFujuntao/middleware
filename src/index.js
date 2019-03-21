import React from 'react';
// react 虚拟dom
import ReactDOM from 'react-dom';
// 自定义样式
import './static/css/index.less';
import App from './App';
// 蚂蚁金服 Css样式
import 'antd/dist/antd.css';
// 挂载的元素
const RootEl = document.getElementById('root');

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp / > ,
      RootEl
    );
  });
}

// render 渲染
ReactDOM.render( < App / > , RootEl);
