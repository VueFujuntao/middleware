import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import { connect } from "react-redux";
import { Layout } from "antd";
import OuterCover from "../../components/outerCover/outerCover.jsx";
import Control from "../../components/control/control.jsx";
import {
  getFirstData,
  closeIo,
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
    closeIo,
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
    properties: PropTypes.array,
    indexList: PropTypes.array,
    pageNum: PropTypes.number,
    status: PropTypes.number,
    sendTime: PropTypes.number,
    getFirstData: PropTypes.func,
    deleteSingleData: PropTypes.func,
    closeIo: PropTypes.func,
    getDataUp: PropTypes.func,
    addSingleData: PropTypes.func,
    setSourceDataInput: PropTypes.func,
    setSourceData: PropTypes.func,
    switchPage: PropTypes.func
  };
  // 设置默认 props 值
  static defaultProps = {
    properties: [],
    pageSize: 1,
    allDataSources: [],
    pageNum: 1,
    status: 1,
    sendTime: 0,
    indexList: []
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
            <Control
              allDataSources={allDataSources}
              getDataUp={getDataUp}
              status={status}
              sendTime={sendTime}
              setSourceDataInput={setSourceDataInput}
              setSourceData={setSourceData}
            />
            {/* 表单控件 */}
            <OuterCover
              sendIoItem={this.sendIoItem}
              stopIoItem={this.stopIoItem}
              pageSize={pageSize}
              deleteSingleData={deleteSingleData}
              getDataUp={getDataUp}
              addSingleData={addSingleData}
              properties={properties}
              pageNum={pageNum}
              indexList={indexList}
              switchPage={switchPage}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Middle Ware ©2019 Created by TAI YUAN
        </Footer>
      </Layout>
    );
  }
}

export default Index;
