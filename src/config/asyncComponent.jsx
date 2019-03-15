import React, { Component } from "react";

/*
  异步组件
  importComponent 组件传入
*/
const AsyncComponent = importComponent => {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        component: null
      };
    }
    componentDidMount() {
      importComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }
    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default AsyncComponent;
