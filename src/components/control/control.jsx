import React from "react";
import PropTypes from "prop-types";
import { Button, Badge, Modal, Select, message, Icon } from "antd";
import { fromJS } from "immutable";
import NumberSourcesMoth from '../NumberSourcesMoth/numberSourcesMoth.jsx';
import NumericInput from '../numericInput/numericInput.jsx';
import AddOrModifyNewData from '../addOrModifyNewData/addOrModifyNewData.jsx';
import "./index.less";

const Option = Select.Option;
const confirm = Modal.confirm;
const START = '开始';
const STOP = '暂停';

// 头部控件
class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 数据源 ID
      sourceId: -1,
      startStop: START,
      modalVisible: false,
      // 薪增数据 修改数据
      addOrModifyNewDataVisible: false
    };
  }

  static propTypes = {
    // 数据源数据列表
    allDataSources: PropTypes.array,
    // 发送 关闭状态码
    status: PropTypes.number,
    // 发送时间
    sendTime: PropTypes.number,
    // 一页显示几条
    pageSize: PropTypes.number,
    data: PropTypes.array,
    getDataUp: PropTypes.func,
    // 修改发送时间 方法
    setSourceDataInput: PropTypes.func,
    setSourceData: PropTypes.func
  };

  static defaultProps = {
    // 数据源数据列表
    allDataSources: [],
    // 发送 关闭状态码
    status: 1,
    // 发送时间
    sendTime: 0,
    pageSize: 0
  };

  componentDidMount() {
    const { status } = this.props;
    if (status === 1) {
      this.setState({
        startStop: START
      })
    } else if (status === 0) {
      this.setState({
        startStop: STOP
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  render() {
    let { allDataSources, status, sendTime } = this.props;

    return (
      <div className="control-context">
        <NumberSourcesMoth
          data={this.props.data}
          setModalVisible={this.setModalVisible}
          modalVisible={this.state.modalVisible}
        />
        <AddOrModifyNewData
          addOrModifyNewDataVisible={this.state.addOrModifyNewDataVisible}
          onClose={this.onClose}
        />
        <div>
          <Select
            style={{ width: 100 }}
            onChange={this.handleChangeSelect}
            placeholder="Select a data"
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
          <Button type="primary"
            // 开启弹框 查看实时数据
            onClick={() => this.setModalVisible(true)}
          >输出数据查看</Button>
        </div>
        <div>
          <Button type="primary" onClick={this.OpenOrCloseDataSource}>
            {this.state.startStop}
          </Button>
        </div>
        <div>
          <Button onClick={this.showDeleteConfirm} type="primary">
            删除
          </Button>
        </div>
        <div>
          <Button type="primary">保存</Button>
        </div>
        <div>
          <Button type="primary" onClick={() => this.showDrawer()}>
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
  setModalVisible = (modalVisible) => {
    if (this.state.sourceId === -1 && modalVisible) return message.error('暂无数据源可查');
    this.setState({ modalVisible });
  }

  // 选中数据源
  handleChangeSelect = e => {
    // 当前数据源 ID
    this.setState({
      sourceId: e
    });
    // 获取数据源数据
    this.props.getDataUp({ id: e }, this.props.pageSize);
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
        console.log(that.state.sourceId);
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  onChange = value => {
    this.props.setSourceDataInput({ sendTime: Number(value) });
  };

  updata = () => {
    this.setState({
      sourcesName: this.props.allDataSources[0].name
    });
  };

  // 打开 或 关闭 数据源
  OpenOrCloseDataSource = () => {
    if (this.state.sourceId === -1) return message.error("先选择数据源");
    if (this.state.startStop === START) {
      this.setState({
        startStop: STOP
      })
    } else if (this.state.startStop === STOP) {
      this.setState({
        startStop: START
      })
    }
    this.props.setSourceData(this.state.sourceId);
  };

  showDrawer = () => {
    console.log(this)
    this.setState({
      addOrModifyNewDataVisible: true,
    });
  };

  onClose = (v) => {
    if (v !== false) {
      let data = v.getFieldsValue();
    } else {
      this.setState({
        addOrModifyNewDataVisible: false,
      });
    }
  };
}

export default Control;
