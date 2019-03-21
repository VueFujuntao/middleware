import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import "./index.less";
import { Layout } from "antd";
import OuterCover from "../../components/outerCover/outerCover.jsx";
import {
  getFirstData,
  closeIo,
  deleteSingleData,
  getDataUp,
  addSingleData
} from "../../redux/module/one.js";


const { Header, Footer, Content } = Layout;

@connect(
  state => state.one,
  { getFirstData, closeIo, getDataUp, deleteSingleData, addSingleData }
)
class Index extends Component {
  static propTypes = {
    properties: PropTypes.array,
    getFirstData: PropTypes.func,
    deleteSingleData: PropTypes.func,
    closeIo: PropTypes.func,
    getDataUp: PropTypes.func,
    addSingleData: PropTypes.func
  };
  // 设置默认 props 值
  static defaultProps = {
    properties: [],
    pageSize: 1
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() { }

  componentDidMount() {
    // this.props.getFirstData();
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
  // deleteSingleData = (item, data) => {
  //   this.props.deleteSingleData(item, data);
  // };

  render() {
    const { addSingleData, getDataUp, properties, deleteSingleData, pageSize } = this.props;
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
            {/* 表单控件 */}
            <OuterCover
              sendIoItem={this.sendIoItem}
              stopIoItem={this.stopIoItem}
              pageSize={pageSize}
              deleteSingleData={deleteSingleData}
              getDataUp={getDataUp}
              addSingleData={addSingleData}
              properties={properties}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Middle Ware  ©2019 Created by TAI YUAN
        </Footer>
      </Layout>
    );
  }
}

export default Index;
