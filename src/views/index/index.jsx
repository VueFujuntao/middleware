import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import "./index.less";
import { Layout } from "antd";
import EntranceGuard from "../entranceGuard/entranceGuard.jsx";
import {
  getFirstData,
  closeIo,
  deleteSingleData,
  getDataUp
} from "../../redux/module/one.js";
const { Header, Footer, Content } = Layout;

@connect(
  state => state.one,
  { getFirstData,  closeIo,  getDataUp, deleteSingleData }
)
class Index extends Component {
  static propTypes = {
    getFirstData: PropTypes.func,
    deleteSingleData: PropTypes.func,
    closeIo: PropTypes.func,
    getDataUp: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.getFirstData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  /* 
    Menthods
  */
  // 启动数据发送
  sendIoItem = item => {
    console.log(item);
  };

  // 暂停数据发送
  stopIoItem = item => {
    console.log(item);
  };

  // 删除单个数据
  deleteSingleData = (item, data) => {
    this.props.deleteSingleData(item, data);
  };

  render() {
    return (
      <Layout className="Highly-filled">
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            height: "80%",
            minHeight: "600px"
          }}
        >
          <div
            style={{ padding: 24, background: "#fff", textAlign: "center" }}
            className="Highly-filled"
          >
            <EntranceGuard
              sendIoItem={this.sendIoItem}
              stopIoItem={this.stopIoItem}
              deleteSingleData={this.deleteSingleData}
              getDataUp={this.props.getDataUp}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }
}

export default Index;
