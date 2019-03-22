import React, { Component } from "react";
// 类型检测
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import { Layout } from "antd";
// 表单组件
import OuterCover from "../../components/outerCover/outerCover.jsx";
// 头部组件
import Control from "../../components/control/control.jsx";
// 蚂蚁 UI
import {
  getFirstData,
  // closeIo,
  deleteSingleData,
  getDataUp,
  addSingleData,
  setSourceDataInput,
  setSourceData,
  indexListPage,
  switchPage
} from "../../redux/module/one.js";
import "./index.less";

const { Header, Footer, Content } = Layout;

@connect(
  state => state.one,
  {
    getFirstData,
    // closeIo,
    getDataUp,
    deleteSingleData,
    addSingleData,
    setSourceDataInput,
    setSourceData,
    indexListPage,
    switchPage
  }
)
class Index extends Component {
  static propTypes = {
    allDataSources: PropTypes.array,
    // 数据源数据总数
    properties: PropTypes.array,
    indexList: PropTypes.array,
    pageNum: PropTypes.number,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 页面展示多少条数据
    pageSize: PropTypes.number,
    getFirstData: PropTypes.func,
    deleteSingleData: PropTypes.func,
    // closeIo: PropTypes.func,
    getDataUp: PropTypes.func,
    addSingleData: PropTypes.func,
    setSourceDataInput: PropTypes.func,
    setSourceData: PropTypes.func,
    switchPage: PropTypes.func
  };
  // 设置默认 props 值
  static defaultProps = {
    // 数据源数据总数
    properties: [],
    indexList: [],
    // 页面展示多少条数据
    pageSize: 0,
    // 数据源数据列表
    allDataSources: [],
    pageNum: 1,
    // 发送 关闭状态码
    status: 1,
    // 发送时间
    sendTime: 0
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() { }

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
  // deleteSingleData = (item, data) => {
  //   this.props.deleteSingleData(item, data);
  // };

  render() {
    const {
      addSingleData,
      getDataUp,
      properties,
      deleteSingleData,
      setSourceDataInput,
      setSourceData,
      pageSize,
      allDataSources,
      pageNum,
      status,
      sendTime,
      indexList,
      switchPage
    } = this.props;

    return (
      <Layout className="Highly-filled">
        <Header style={{ background: "#fff", padding: 0 }}>
          <h1 className="text-h1">数据源管理</h1>
        </Header>
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
            {/* 头部组件 */}
            <Control
              // 数据列表
              allDataSources={allDataSources}
              // 切换 数据源
              getDataUp={getDataUp}
              // 是否开启 状态值
              status={status}
              // 数据源发送时间
              sendTime={sendTime}
              setSourceDataInput={setSourceDataInput}
              setSourceData={setSourceData}
              // 页面几条数据
              pageSize={pageSize}
            />
            {/* 表单组件 */}
            <OuterCover
              sendIoItem={this.sendIoItem}
              stopIoItem={this.stopIoItem}
              // 页面几条数据
              pageSize={pageSize}
              deleteSingleData={deleteSingleData}
              addSingleData={addSingleData}
              properties={properties}
              pageNum={pageNum}
              indexList={indexList}
              // 切换页面 改变数据
              switchPage={switchPage}
            />
          </div>
        </Content>
        <Footer className="textAlign">
          Middle Ware ©2019 Created by TAI YUAN
        </Footer>
      </Layout>
    );
  }
}

export default Index;
