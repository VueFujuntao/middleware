import React, { Component } from "react";

/*
  异步组件
  importComponent 组件传入
*/
const AsyncComponent = importComponent => {
  // 导出 高阶组件
  return class extends Component {
    constructor(props) {
      // 改变this 指向
      super(props);
      this.state = {
        component: null
      };
    }
    componentDidMount() {
      importComponent().then(cmp => {
        // 将组建 挂载在state上
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;
      // 导入 属性 ...this.props
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
