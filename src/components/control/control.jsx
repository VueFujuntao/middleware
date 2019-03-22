import React from "react";
import PropTypes from "prop-types";
import { Input, Button, Badge, Modal, Select, message, Icon } from "antd";
import { fromJS } from "immutable";
import NumericInput from "../numericInput/numericInput.jsx";
import "./index.less";

const Option = Select.Option;
const confirm = Modal.confirm;

class Control extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      sourceId: -1
    };
  }

  static propTypes = {
    allDataSources: PropTypes.array,
    status: PropTypes.number,
    sendTime: PropTypes.number,
    getDataUp: PropTypes.func,
    setSourceDataInput: PropTypes.func,
    setSourceData: PropTypes.func
  };

  static defaultProps = {
    allDataSources: [],
    status: 1,
    sendTime: 0
  };

  componentDidMount() {
    if (this.props.allDataSources.length > 0) {
      this.setState({
        sourcesName: this.props.allDataSources[0].name
      });
      // this.updata()
    }
  }

  onChange = value => {
    this.props.setSourceDataInput({ sendTime: Number(value) });
    // this.setState({ value });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  updata = () => {
    this.setState({
      sourcesName: this.props.allDataSources[0].name
    });
  };
  OpenOrCloseDataSource = () => {
    console.log("开启");
    this.props.setSourceData(this.state.sourceId);
  };
  render() {
    let { allDataSources, status, sendTime, setSourceData } = this.props;

    return (
      <div className="control-context">
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
          <Input
            placeholder="Basic usage"
            value="发送间隔:"
            disabled
            style={{ width: 80 }}
          />
          <NumericInput
            style={{ width: 120 }}
            value={sendTime}
            onChange={this.onChange}
          />
        </div>
        <div>
          <Button type="primary">输出数据查看</Button>
        </div>
        <div>
          <Button type="primary" onClick={this.OpenOrCloseDataSource}>
            开始
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

  // 选中数据源
  handleChangeSelect = e => {
    // 当前数据源 ID
    this.setState({
      sourceId: e
    });
    // 获取数据源数据
    this.props.getDataUp({ id: e });
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
}

export default Control;
