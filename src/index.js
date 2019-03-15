import React from 'react';
import ReactDOM from 'react-dom';
// 自定义样式
import './index.less';
import App from './App';
// 蚂蚁金服 Css样式
import 'antd/dist/antd.css';
// 挂载元素
const rootEl = document.getElementById('root');

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
