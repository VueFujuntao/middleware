import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import "./index.less";
import { Layout } from "antd";

@connect(
  state => state.one,
  {}
)
class Index extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    console.log(1)
  }

  componentDidMount() {
    console.log(2)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  render() {
    return (
      <div className="index-context">
        <header style={{ height: "10%" }} />
        <main style={{ height: "85%" }} />
        <footer style={{ height: "5%" }} />
      </div>
    );
  }
}

export default Index;
