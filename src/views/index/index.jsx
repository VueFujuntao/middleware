import React, { Component } from "react";
// 类型检测
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import { Layout, Button } from "antd";
// 表单组件
import OuterCover from "../../components/outerCover/outerCover.jsx";
// 头部组件
import Control from "../../components/control/control.jsx";
// 蚂蚁 UI
import {
  // 获取数据列表
  getFirstData,
  // 获取输出数据
  printSendData,
  // 删除单个数据
  deleteSingleData,
  // 切换 数据源
  getDataUp,
  // 添加单个数据
  addSingleData,
  // 修改发送时间
  setSourceDataInput,
  // 开始  关闭 数据源
  setSourceData,
  // 切换页面 改变数据
  switchPage,
  // 删除数据源
  deleteDataSource,
  // 开启 关闭数据
  openOrCloseUseData,
  // 切换页码
  switchPageNum,
  // 绑定关联数据
  bindParentData,
  // 添加数据源
  addDataSource,
  // 改变单条数据
  changeData,
  changeSurceId,
  importantAlarm,
  changeDataFun
} from "../../redux/module/dataSource.js";
import "./index.less";

const { Header, Footer, Content } = Layout;
const ButtonGroup = Button.Group;

@connect(
  state => state.dataSource,
  {
    // 获取数据列表
    getFirstData,
    // 获取输出数据
    printSendData,
    // 切换 数据源
    getDataUp,
    // 删除单个数据
    deleteSingleData,
    // 添加单个数据
    addSingleData,
    // 修改发送时间
    setSourceDataInput,
    // 开始  关闭 数据源
    setSourceData,
    // 切换页面 改变数据
    switchPage,
    // 删除数据源
    deleteDataSource,
    // 开启 关闭数据
    openOrCloseUseData,
    // 切换页码
    switchPageNum,
    // 绑定关联数据
    bindParentData,
    // 添加数据源
    addDataSource,
    changeData,
    changeSurceId,
    importantAlarm,
    changeDataFun
  }
)
class Index extends Component {
  static propTypes = {
    allDataSources: PropTypes.array,
    // 数据源数据总数
    properties: PropTypes.array,
    // 页面展示数据
    indexList: PropTypes.array,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 页面展示多少条数据
    pageSize: PropTypes.number,
    // 当前页码
    pageNum: PropTypes.number,
    // 输出数据
    message: PropTypes.string,
    // 获取数据列表
    getFirstData: PropTypes.func,
    // 删除单个数据
    deleteSingleData: PropTypes.func,
    // 切换 数据源
    getDataUp: PropTypes.func,
    // 添加单个数据
    addSingleData: PropTypes.func,
    // 修改发送时间
    setSourceDataInput: PropTypes.func,
    // 开始  关闭 数据源
    setSourceData: PropTypes.func,
    // 切换页面 改变数据
    switchPage: PropTypes.func,
    // 切换页码
    switchPageNum: PropTypes.func,
    // 获取输出数据
    printSendData: PropTypes.func,
    // 删除数据源
    deleteDataSource: PropTypes.func,
    // 开启 关闭数据
    openOrCloseUseData: PropTypes.func,
    // 绑定关联数据
    bindParentData: PropTypes.func,
    // 添加数据源
    addDataSource: PropTypes.func,
    changeData: PropTypes.func,
    changeSurceId: PropTypes.func,
    changeDataFun: PropTypes.func
  };

  // 设置默认 props 值
  static defaultProps = {
    // 数据源数据总数
    properties: [],
    // 当前页面数据
    indexList: [],
    // 页面展示多少条数据
    pageSize: 0,
    // 数据源数据列表
    allDataSources: [],
    // 当前页码
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

  render() {
    const {
      // 添加单个数据 -- 方法
      addSingleData,
      // 切换 数据源 -- 方法
      getDataUp,
      // 删除单个数据 -- 方法
      deleteSingleData,
      // 修改发送时间 -- 方法
      setSourceDataInput,
      // 开始  关闭 数据源 -- 方法
      setSourceData,
      // 切换页面 改变数据 -- 方法
      switchPage,
      // 获取输出数据 -- 方法
      printSendData,
      // 删除数据源 -- 方法
      deleteDataSource,
      // 开启 关闭数据 -- 方法
      openOrCloseUseData,
      // 切换页码 -- 方法
      switchPageNum,
      // 绑定关联数据 -- 方法
      bindParentData,
      changeData,
      // 当前页码 -- 数字
      pageNum,
      // 数据源发送时间 -- 数字
      sendTime,
      // 页面大小 -- 数字
      pageSize,
      // 开始关闭状态 -- 数字
      status,
      // 数据列表 -- 数组
      allDataSources,
      // 数据总数 --数组
      properties,
      // 当前页的数据 -- 数组
      indexList,
      // 数据源名称 -- 字符串
      name,
      // 输出数据查看 -- 字符串
      message,
      // 关联数据
      parentData,
      // 添加数据源
      addDataSource,
      sourceId,
      changeSurceId,
      changeDataFun
    } = this.props;

    return (
      <Layout className="Highly-filled">
        <Header className="header">
          <h1 className="text-h1">数据源管理</h1>
          <ButtonGroup className="button-group">
            <Button
              disabled={sourceId === -1 || status === 1}
              onClick={() => this.changeClick(2)}
            >
              火灾
            </Button>
            <Button
              disabled={sourceId === -1 || status === 1}
              onClick={() => this.changeClick(3)}
            >
              漏水
            </Button>
            <Button
              disabled={sourceId === -1 || status === 1}
              onClick={() => this.changeClick(4)}
            >
              闯入
            </Button>
            <Button
              disabled={sourceId === -1 || status === 1}
              onClick={() => this.changeClick(5)}
            >
              UPS
            </Button>
          </ButtonGroup>
        </Header>
        <Content className="content">
          <div
            className="Highly-filled-div"
          >
            {/* 头部组件 */}
            <Control
              // 数据列表 -- 数组
              allDataSources={allDataSources}
              // 切换 数据源 -- 方法
              getDataUp={getDataUp}
              // 是否开启 状态值
              status={status}
              // 数据源发送时间 -- 数字
              sendTime={sendTime}
              // 修改发送时间 -- 方法
              setSourceDataInput={setSourceDataInput}
              // 开始  关闭 数据源 -- 方法
              setSourceData={setSourceData}
              // 页面几条数据
              pageSize={pageSize}
              // 数据总数 --数组
              properties={properties}
              // 数据源名称 -- 字符串
              name={name}
              // 获取输出数据 -- 方法
              printSendData={printSendData}
              // 删除数据源 -- 方法
              deleteDataSource={deleteDataSource}
              // 输出数据查看 -- 字符窜
              message={message}
              // 添加单个数据 -- 方法
              addSingleData={addSingleData}
              // 当前页的数据 -- 数组
              indexList={indexList}
              // 当前页码 -- 数字
              pageNum={pageNum}
              // 绑定关联事件 -- 方法
              bindParentData={bindParentData}
              // 关联数据 -- 数组
              parentData={parentData}
              // 添加数据源
              addDataSource={addDataSource}
              sourceId={sourceId}
              changeSurceId={changeSurceId}
            />
            {/* 表单组件 */}
            <OuterCover
              // 页面几条数据 -- 数字
              pageSize={pageSize}
              // 删除单个数据 -- 方法
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
              // 改变单条数据 -- 方法
              changeData={changeData}
              changeDataFun={changeDataFun}
            />
          </div>
        </Content>
        <Footer className="textAlign">
          Middle Ware ©2019 Created by TAI YUAN
        </Footer>
      </Layout>
    );
  }

  changeClick = e => {
    let { importantAlarm, sourceId, pageNum, pageSize } = this.props;
    importantAlarm({
      id: sourceId,
      importantAlarmId: e,
      pageNum: pageNum,
      pageSize: pageSize
    });
  };
}

export default Index;
