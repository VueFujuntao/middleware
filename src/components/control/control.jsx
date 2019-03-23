import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Badge, Modal, Select, message, Icon, Tooltip } from "antd";
import { fromJS } from "immutable";
import NumberSourcesMoth from '../NumberSourcesMoth/numberSourcesMoth.jsx';
import "./index.less";

const Option = Select.Option;
const confirm = Modal.confirm;

// 输入框 控件
class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
    if (
      (!Number.isNaN(value) && reg.test(value)) ||
      value === "" ||
      value === "-"
    ) {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if (value.toString().charAt(value.toString().length - 1) === "." || value === "-") {
      onChange(value.toString().slice(0, -1));
    }
    if (onBlur) {
      onBlur();
    }
  };

  formatNumber(value) {
    value += "";
    const list = value.split(".");
    const prefix = list[0].charAt(0) === "-" ? "-" : "";
    let num = prefix ? list[0].slice(1) : list[0];
    let result = "";
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  }

  render() {
    const { value } = this.props;
    const title = value ? (
      <span className="numeric-input-title">
        {value !== "-" ? this.formatNumber(value) : "-"}
      </span>
    ) : (
        "Input a number"
      );
    return (
      <Tooltip
        trigger={["focus"]}
        title={title}
        placement="topLeft"
        overlayClassName="numeric-input"
      >
        <Input
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
          placeholder="Input a number"
          maxLength={25}
        />
      </Tooltip>
    );
  }
}

// 头部控件
class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 数据源 ID
      sourceId: -1,
      startStop: '开始',
      modalVisible: false
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
        <NumberSourcesMoth data={this.props.data} setModalVisible={this.setModalVisible} modalVisible={this.state.modalVisible} />
        <div>
          <Select
            style={{ width: 100 }}
            onChange={this.handleChangeSelect}
            placeholder="Select a person"
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
          <Button type="primary" onClick={() => this.setModalVisible(true)}>输出数据查看</Button>
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
          <Button type="primary">新增数据</Button>
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
    if (this.state.sourceId === -1) return message.error("选中数据源");
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
    if (this.state.startStop === '开始') {
      this.setState({
        startStop: '暂停'
      })
    } else if (this.state.startStop === '暂停') {
      this.setState({
        startStop: '开始'
      })
    }
    this.props.setSourceData(this.state.sourceId);
  };
}

export default Control;
