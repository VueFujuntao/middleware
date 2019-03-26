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
  // 获取数据列表
  getFirstData,
  printSendData,
  deleteSingleData,
  getDataUp,
  addSingleData,
  setSourceDataInput,
  // 开始  关闭 数据源
  setSourceData,
  indexListPage,
  switchPage,
  deleteDataSource,
  openOrCloseUseData,
  switchPageNum
} from "../../redux/module/one.js";
import "./index.less";

const { Header, Footer, Content } = Layout;

@connect(
  state => state.one,
  {
    // 获取数据列表
    getFirstData,
    printSendData,
    getDataUp,
    deleteSingleData,
    addSingleData,
    setSourceDataInput,
    // 开始  关闭 数据源
    setSourceData,
    indexListPage,
    switchPage,
    deleteDataSource,
    openOrCloseUseData,
    switchPageNum
  }
)
class Index extends Component {
  static propTypes = {
    allDataSources: PropTypes.array,
    // 数据源数据总数
    properties: PropTypes.array,
    indexList: PropTypes.array,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 页面展示多少条数据
    pageSize: PropTypes.number,
    pageNum: PropTypes.number,
    // 输出数据
    message: PropTypes.string,
    // 获取数据列表
    getFirstData: PropTypes.func,
    deleteSingleData: PropTypes.func,
    getDataUp: PropTypes.func,
    addSingleData: PropTypes.func,
    setSourceDataInput: PropTypes.func,
    // 开始  关闭 数据源
    setSourceData: PropTypes.func,
    switchPage: PropTypes.func,
    switchPageNum: PropTypes.func
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
    sendTime: 0,
    // 输出数据
    message: ""
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {
    // 获取数据列表
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
      // 开始  关闭 数据源
      setSourceData,
      // 页面大小
      pageSize,
      allDataSources,
      // 开始关闭状态
      status,
      sendTime,
      // 数据源名称
      name,
      indexList,
      switchPage,
      data,
      printSendData,
      deleteDataSource,
      message,
      openOrCloseUseData,
      pageNum,
      switchPageNum
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
              // 修改发送时间 方法
              setSourceDataInput={setSourceDataInput}
              // 开始  关闭 数据源
              setSourceData={setSourceData}
              // 页面几条数据
              pageSize={pageSize}
              data={data}
              // 数据总数
              properties={properties}
              // 数据源名称
              name={name}
              // 获取输出数据
              printSendData={printSendData}
              // 删除数据源
              deleteDataSource={deleteDataSource}
              // 输出数据查看
              message={message}
              // 添加单个数据
              addSingleData={addSingleData}
              // 当前页的数据
              indexList={indexList}
              // 当前页码
              pageNum={pageNum}
            />
            {/* 表单组件 */}
            <OuterCover
              // 页面几条数据 -- 数字
              pageSize={pageSize}
              // 删除单个数据
              deleteSingleData={deleteSingleData}
              // 总数据 -- 数组
              properties={properties}
              // 当前页的数据 -- 数组
              indexList={indexList}
              // 切换页面 改变数据 -- 方法
              switchPage={switchPage}
              // 开启 关闭数据 -- 方法
              openOrCloseUseData={openOrCloseUseData}
              // 当前页码 -- 数字
              pageNum={pageNum}
              // 切换页码 -- 方法
              switchPageNum={switchPageNum}
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
