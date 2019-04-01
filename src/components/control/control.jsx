import React from "react";
import PropTypes from "prop-types";
import { Button, Badge, Modal, Select, Icon } from "antd";
import { fromJS } from "immutable";
import NumberSourcesMoth from "./NumberSourcesMoth/numberSourcesMoth.jsx";
import NumericInput from "./numericInput/numericInput.jsx";
import AddOrModifyNewData from "./addOrModifyNewData/addOrModifyNewData.jsx";
import AddDataSource from "./addDataSource/addDataSource.jsx";
import "./index.less";

const Option = Select.Option;
const confirm = Modal.confirm;

// 头部控件
class Control extends React.Component {
  static propTypes = {
    // 数据源数据列表
    allDataSources: PropTypes.array,
    // 所以数据
    properties: PropTypes.array,
    // 展示页面数据
    indexList: PropTypes.array,
    // 关联数据
    parentData: PropTypes.array,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 一页显示几条
    pageSize: PropTypes.number,
    // 当前页码
    pageNum: PropTypes.number,
    // 发送数据
    message: PropTypes.string,
    // 数据源名称
    name: PropTypes.string,
    // 切换 数据源
    getDataUp: PropTypes.func,
    // 修改发送时间 方法
    setSourceDataInput: PropTypes.func,
    // 开始  关闭 数据源
    setSourceData: PropTypes.func,
    // 添加单个数据
    addSingleData: PropTypes.func,
    // 获取输出数据
    printSendData: PropTypes.func,
    // 绑定关联数据
    bindParentData: PropTypes.func,
    // 添加数据源
    addDataSource: PropTypes.func,
    changeSurceId: PropTypes.func
  };

  static defaultProps = {
    // 数据源数据列表
    allDataSources: [],
    // 所以数据
    properties: [],
    // 页面展示数据
    indexList: [],
    // 发送 关闭状态码
    status: 1,
    // 发送时间
    sendTime: 0,
    // 一页显示几条
    pageSize: 0,
    // 当前页码
    pageNum: 1,
    // 发送数据
    message: "",
    // 数据源名称
    name: "",
    // 关联父数据
    parentData: [],
    // 数据源 ID
    sourceId: -1
  };

  constructor(props) {
    super(props);
    this.state = {
      // 数据源 ID
      // sourceId: -1,
      // // 开始关闭数据源
      // startStop: START,
      // 显示数字版块
      modalVisible: false,
      // 薪增数据 修改数据
      addOrModifyNewDataVisible: false,
      addDataSourceVisible: false,
      selectedItems: [],
      v: false
    };
  }

  componentDidMount() {
    // // 初始化 开启关闭状态
    // const { status } = this.props;
    // if (status === 1) {
    //   this.setState({
    //     startStop: START
    //   });
    // } else if (status === 0) {
    //   this.setState({
    //     startStop: STOP
    //   });
    // }
  }
  chnageV = (e) => {
    this.setState({
      v: e
    });
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
      message,
      // 绑定关联数据
      bindParentData,
      // 关联父数据
      parentData,
      sourceId
    } = this.props;

    let {
      modalVisible,
      addOrModifyNewDataVisible,
      addDataSourceVisible,
      selectedItems,
      v
    } = this.state;

    // const {sourceId} = this.props;

    return (
      <div className="control-context">
        {/* // 查看發送數據 值 */}
        <NumberSourcesMoth
          data={message}
          setModalVisible={this.setModalVisible}
          modalVisible={modalVisible}
        />
        {/* 增加数据 */}
        <AddOrModifyNewData
          addOrModifyNewDataVisible={addOrModifyNewDataVisible}
          bindParentData={bindParentData}
          parentData={parentData}
          selectedItems={selectedItems}
          onClose={this.onClose}
          handleChange={this.handleChange}
          sourceId={sourceId}
          v={v}
          chnageV={this.chnageV}
        />
        {/* 增加数据源 */}
        <AddDataSource
          addDataSourceVisible={addDataSourceVisible}
          addDataSourceClose={this.addDataSourceClose}
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
          <Badge
            status={status === 1 ? "default" : "processing"}
            text={status === 1 ? "未启动" : "正在发送"}
            className="processing"
          />
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
        <div className="div-icon">
          <Icon
            type="plus-circle"
            theme="twoTone"
            className="icon"
            onClick={this.showDrawerDataOurce}
          />
        </div>
      </div>
    );
  }

  // 關閉 輸出數據源 彈框
  setModalVisible = modalVisible => {
    if (modalVisible) this.props.printSendData(this.props.sourceId);
    this.setState({ modalVisible });
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  // 选中数据源
  handleChangeSelect = e => {
    let { getDataUp, pageSize, changeSurceId } = this.props;
    // 当前数据源 ID
    getDataUp({ id: e }, pageSize);
    changeSurceId({id: e})
    // 获取数据源数据
  };

  // 删除数据源
  showDeleteConfirm = () => {
    let { deleteDataSource, allDataSources, sourceId } = this.props;
    confirm({
      title: "您确定要删除此数据源吗?",
      okText: "确认",
      okType: "danger",
      cancelText: "取消",
      onOk() {
        deleteDataSource({ id: sourceId, allDataSources });
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
    let { name, sendTime, properties, status, setSourceData, sourceId } = this.props;
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
  onClose = (bool, result) => {
    this.chnageV(false);
    if (bool !== false) {
      let data = result.getFieldsValue();
      for (let item in data) {
        if (item !== 'detailsDes' && data[item] !== undefined) {
          data[item] = Number(data[item])
        }
      }
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
        addValue,
        parentId,
        isChangeStatus,
        id
      } = data;
      console.log(data);
      let dataSourceId = this.props.sourceId;
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
        isParentData,
        parentId,
        isChangeStatus,
        id
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
      addSingleData({ data: newData, properties, indexList, pageSize, pageNum });
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
    result.resetFields();
  };

  // 显示 弹框 添加 数据源
  showDrawerDataOurce = () => {
    this.setState({
      addDataSourceVisible: true
    });
  };

  // 关闭 添加数据源
  addDataSourceClose = (bool, result) => {
    if (bool === true) {
      let data = result.getFieldsValue();
      data.sendTime = Number(data.sendTime);
      const { addDataSource, allDataSources } = this.props;
      addDataSource({ data, allDataSources });
    }
    // 清空表单
    result.resetFields();
    this.setState({
      addDataSourceVisible: false
    });
  };
}

export default Control;
