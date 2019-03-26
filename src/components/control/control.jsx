import React from "react";
import PropTypes from "prop-types";
import { Button, Badge, Modal, Select, message, Icon } from "antd";
import { fromJS } from "immutable";
import NumberSourcesMoth from "../NumberSourcesMoth/numberSourcesMoth.jsx";
import NumericInput from "../numericInput/numericInput.jsx";
import AddOrModifyNewData from "../addOrModifyNewData/addOrModifyNewData.jsx";
import "./index.less";

const Option = Select.Option;
const confirm = Modal.confirm;
const START = "开始";
const STOP = "暂停";

// 头部控件
class Control extends React.Component {

  static propTypes = {
    // 数据源数据列表
    allDataSources: PropTypes.array,
    properties: PropTypes.array,
    indexList: PropTypes.array,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 一页显示几条
    pageSize: PropTypes.number,
    pageNum: PropTypes.number,
    data: PropTypes.array,
    // 发送数据
    message: PropTypes.string,
    // 数据源名称
    name: PropTypes.string,
    getDataUp: PropTypes.func,
    // 修改发送时间 方法
    setSourceDataInput: PropTypes.func,
    setSourceData: PropTypes.func,
    addSingleData: PropTypes.func
  };

  static defaultProps = {
    // 数据源数据列表
    allDataSources: [],
    properties: [],
    indexList: [],
    // 发送 关闭状态码
    status: 1,
    // 发送时间
    sendTime: 0,
    // 一页显示几条
    pageSize: 0,
    pageNum: 1,
    // 发送数据
    message: "",
    // 数据源名称
    name: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      // 数据源 ID
      sourceId: -1,
      // 开始关闭数据源
      startStop: START,
      modalVisible: false,
      // 薪增数据 修改数据
      addOrModifyNewDataVisible: false
    };
  }
  
  componentDidMount() {
    const { status } = this.props;
    if (status === 1) {
      this.setState({
        startStop: START
      });
    } else if (status === 0) {
      this.setState({
        startStop: STOP
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  render() {
    let {
      // 数据源数据列表
      allDataSources,
      // 发送 关闭状态码
      status,
      // 发送时间
      sendTime,
      // 发送数据
      message
    } = this.props;

    let { modalVisible, addOrModifyNewDataVisible, sourceId } = this.state;

    return (
      <div className="control-context">
        <NumberSourcesMoth
          data={message}
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
        />
        <AddOrModifyNewData
          addOrModifyNewDataVisible={addOrModifyNewDataVisible}
          onClose={this.onClose}
        />
        <div>
          <Select
            ref="select"
            style={{ width: 100 }}
            onChange={this.handleChangeSelect}
            placeholder="Select a data"
            key="1"
          >
            {allDataSources.map(item => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </div>
        <div>
          {status === 1 ? (
            <Badge status="default" text="未启动" className="processing" />
          ) : (
            <Badge status="processing" text="正在发送" className="processing" />
          )}
        </div>
        <div>
          发送间隔:&nbsp;
          <NumericInput
            style={{ width: 120 }}
            value={sendTime}
            onChange={this.onChange}
          />
        </div>
        <div>
          <Button
            type="primary"
            // 开启弹框 查看实时数据
            onClick={() => this.setModalVisible(true)}
            disabled={status === 1}
          >
            输出数据查看
          </Button>
        </div>
        <div>
          <Button
            disabled={sourceId !== -1 ? false : true}
            type="primary"
            onClick={this.OpenOrCloseDataSource}
          >
            {status === 1 ? "开启" : "关闭"}
          </Button>
        </div>
        <div>
          <Button
            disabled={sourceId !== -1 ? false : true}
            onClick={this.showDeleteConfirm}
            type="primary"
          >
            删除
          </Button>
        </div>
        <div>
          <Button type="primary" disabled={sourceId !== -1 ? false : true}>
            保存
          </Button>
        </div>
        <div>
          <Button
            type="primary"
            disabled={sourceId !== -1 ? false : true}
            onClick={() => this.showDrawer()}
          >
            <Icon type="plus" />
            新增数据
          </Button>
        </div>
        <div style={{ float: "right", marginRight: "20px" }}>
          <Icon
            type="plus-circle"
            theme="twoTone"
            style={{ fontSize: "30px", lineHeight: "50px", cursor: "pointer" }}
          />
        </div>
      </div>
    );
  }

  // 關閉 輸出數據源 彈框
  setModalVisible = modalVisible => {
    if (this.state.sourceId === -1 && modalVisible)
      return message.error("暂无数据源可查");
    if (modalVisible) this.props.printSendData(this.state.sourceId);
    this.setState({ modalVisible });
  };

  // 选中数据源
  handleChangeSelect = e => {
    // 当前数据源 ID
    this.props.getDataUp({ id: e }, this.props.pageSize);
    this.setState({
      sourceId: e
    });
    // 获取数据源数据
  };

  // 删除数据源
  showDeleteConfirm = () => {
    if (this.state.sourceId === -1) return message.error("先选择数据源");
    let that = this;
    confirm({
      title: "您确定要删除此数据源吗?",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        that.props.deleteDataSource(
          that.state.sourceId,
          that.props.allDataSources
        );
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // 修改input发送时间
  onChange = value => {
    this.props.setSourceDataInput({ sendTime: Number(value) });
  };

  // 打开 或 关闭 数据源
  OpenOrCloseDataSource = () => {
    let { name, sendTime, properties, status, setSourceData } = this.props;
    let { sourceId } = this.state;
    if (sourceId === -1) return message.error("先选择数据源");
    if (status === 1) {
      setSourceData(properties, sourceId, 0, sendTime, name);
    } else if (status === 0) {
      setSourceData(properties, sourceId, 1, sendTime, name);
    }
  };

  // 新增数据 弹框打开
  showDrawer = () => {
    this.setState({
      addOrModifyNewDataVisible: true
    });
  };

  // 关闭弹框
  onClose = v => {
    console.log(v);
    if (v !== false) {
      let data = v.getFieldsValue();
      console.log(data);
      let {
        methodId,
        changeTime,
        detailsDes,
        importantAlarmId,
        isParentData,
        maxAlarmValue,
        maxValue,
        minValue,
        value,
        minAlarmValue,
        dValue,
        subValue,
        addValue
      } = data;
      if (methodId !== undefined) {
        methodId = Number(methodId);
      }
      if (changeTime !== undefined) {
        changeTime = Number(changeTime);
      }
      if (importantAlarmId !== undefined) {
        importantAlarmId = Number(importantAlarmId);
      }
      if (isParentData !== undefined) {
        isParentData = Number(isParentData);
      }
      if (maxAlarmValue !== undefined) {
        maxAlarmValue = Number(maxAlarmValue);
      }
      if (minAlarmValue !== undefined) {
        minAlarmValue = Number(minAlarmValue);
      }
      if (maxValue !== undefined) {
        maxValue = Number(maxValue);
      }
      if (minValue !== undefined) {
        minValue = Number(minValue);
      }
      if (value !== undefined) {
        value = Number(value);
      }
      if (dValue !== undefined) {
        dValue = Number(dValue);
      }
      if (subValue !== undefined) {
        subValue = Number(subValue);
      }
      if (addValue !== undefined) {
        addValue = Number(addValue);
      }
      let dataSourceId = this.state.sourceId;
      let newData = {
        canshuzhi: JSON.stringify({
          maxAlarmValue,
          maxValue,
          minAlarmValue,
          minValue,
          dValue,
          subValue,
          addValue
        }),
        value,
        methodId,
        detailsDes,
        dataSourceId,
        changeTime,
        importantAlarmId,
        isParentData
      };

      // 结构参数
      let {
        properties,
        indexList,
        pageSize,
        pageNum,
        addSingleData
      } = this.props;
      // 增加单个数据
      addSingleData(newData, properties, indexList, pageSize, pageNum);
      // 关闭弹框
      this.setState({
        addOrModifyNewDataVisible: false
      });
    } else {
      this.setState({
        addOrModifyNewDataVisible: false
      });
    }
    // 清空表单
    v.resetFields();
  };

}

export default Control;
