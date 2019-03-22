import React from "react";
// 性能提升库
import { fromJS } from "immutable";
// 蚂蚁 UI
import {
  Button,
  Pagination,
  Popconfirm,
  message,
  Select,
  Empty,
  Modal,
  Input,
  Row,
  Col
} from "antd";
// PropTypes props类型检查
import PropTypes from "prop-types";
import "./index.less";

const Option = Select.Option;
const InputGroup = Input.Group;

class OuterCover extends React.Component {
  // 以随意为每一个属性指定类型。这对于我们检查和处理属性的意外赋值非常有用。
  static propTypes = {
    // 总数据
    properties: PropTypes.array,
    // 当前页的数据
    indexList: PropTypes.array,
    // 页面数据几条
    pageSize: PropTypes.number,
    pageNum: PropTypes.number,
    stopIoItem: PropTypes.func,
    // 启用数据
    sendIoItem: PropTypes.func,
    // 删除单个数据
    deleteSingleData: PropTypes.func,
    // 添加单个数据
    addSingleData: PropTypes.func,
    // 切换页码
    switchPage: PropTypes.func
  };

  // 设置默认 props 值
  static defaultProps = {
    // 总数据
    properties: [],
    // 当前页的数据
    indexList: [],
    pageSize: 0,
    pageNum: 1
  };
  /*
    构造函数 添加一个类构造函数来初始化状态 this.state
    注意传递 props 到基础构造函数的
  */
  constructor(props) {
    super(props);
    /*
    this.state 定义数据,数据是响应的
    修改数据,例子： this.setstate({date: 1})
    */
    this.state = {
      PolylineCycle: false,
      VolatilityValue: false,
      RandomValue: false,
      Sinusoidal: false
    };
  }

  // 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
  componentWillMount() { }

  // 组件渲染之后调用，只调用一次。
  componentDidMount() { }

  // 组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps(nextProps) { }
  /*
    react性能优化非常重要的一环。组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，节省大量性能，尤其是在dom结构复杂的时候
  */
  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  // 组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
  componentWillUpdate(nextProps, nextState) { }

  // 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
  componentDidUpdate() { }

  // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
  componentWillUnmount() { }

  goee = () => {
    this.setState({
      number: this.state.number + 1
    });
    this.props.addSingleData(
      {
        canshuzhi:
          "{'maxAlarmValue:50,'maxValue:100,'minAlarmValue:30,'minValue:0,'propertyId': '1}",
        changePropertyId: "2",
        changeTime: 5000,
        dataSourceId: 1,
        detailsDes: "嗷嗷嗷",
        id: this.state.number,
        isChangeStatus: "0",
        methodId: 1,
        simpleDes: "无",
        status: "0",
        value: "0"
      },
      this.props.properties
    );
  };

  // react最重要的步骤，创建虚拟dom，进行diff算法，更新dom树都在此进行。此时就不能更改state了。
  render() {
    /*
      最外层需要一个元素包裹
      写类 需要 className 因为 class 与 es class语法糖 冲突
    */
    const {
      // 总数据
      properties,
      // 当前页的数据
      indexList,
      // 启用数据
      sendIoItem,
      pageNum,
      // 一页 几条数据
      pageSize
    } = this.props;

    return (
      <div className="less-context">
        {/* PolylineCycle */}
        <Modal
          visible={this.state.PolylineCycle}
          onOk={() => this.handleOk("PolylineCycle")}
          onCancel={() => this.handleCancel("PolylineCycle")}
        >
          <InputGroup size="small">
            <Row gutter={4}>
              <Col span={4}>最大值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>最小值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>预警阈值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>波动差值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
          </InputGroup>
        </Modal>
        {/* VolatilityValue */}
        <Modal
          visible={this.state.VolatilityValue}
          onOk={() => this.handleOk("VolatilityValue")}
          onCancel={() => this.handleCancel("VolatilityValue")}
        >
          <InputGroup size="small">
            <Row gutter={4}>
              <Col span={5}>最大值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={5}>最小值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={5}>预警阈值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={5}>波动差值范围</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
          </InputGroup>
        </Modal>
        {/* RandomValue */}
        <Modal
          visible={this.state.RandomValue}
          onOk={() => this.handleOk("RandomValue")}
          onCancel={() => this.handleCancel("RandomValue")}
        >
          <InputGroup size="small">
            <Row gutter={4}>
              <Col span={5}>最大值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={5}>最小值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={5}>预警阈值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
          </InputGroup>
        </Modal>
        {/* Sinusoidal */}
        <Modal
          visible={this.state.Sinusoidal}
          onOk={() => this.handleOk("Sinusoidal")}
          onCancel={() => this.handleCancel("Sinusoidal")}
        >
          <InputGroup size="small">
            <Row gutter={4}>
              <Col span={4}>最大值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>最小值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>预警阈值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
            <Row gutter={4} style={{ marginTop: "10px" }}>
              <Col span={4}>波动差值</Col>
              <Col span={8}>
                <Input defaultValue="0" />
              </Col>
            </Row>
          </InputGroup>
        </Modal>
        <table border="1" cellPadding="5" cellSpacing="5" className="table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>序号</th>
              <th>KEY</th>
              <th>VALUE</th>
              <th style={{ width: "150px" }}>变化函数</th>
              <th>描述</th>
              <th style={{ width: "100px" }}>类型</th>
              <th style={{ width: "120px" }}>变化时间</th>
              <th style={{ width: "138px" }}>操作</th>
              <th style={{ width: "100px" }}>关联事件</th>
            </tr>
          </thead>
          <tbody>
            {
              indexList.map((item, index) => {
                return (
                  <tr key={item.id} className="table-tr">
                    <th>{index + 1 + (pageNum - 1) * 10}</th>
                    <td>{item.id}</td>
                    <td>{item.attributeName}</td>
                    <td>
                      <Select
                        labelInValue
                        defaultValue={{ key: "no" }}
                        style={{ width: 140 }}
                        onChange={this.handleChangeSelectFunction}
                      >
                        <Option value="no">无</Option>
                        <Option value="PolylineCycle">折线周期函数</Option>
                        <Option value="VolatilityValue">波动取值函数</Option>
                        <Option value="RandomValue">随机取值函数</Option>
                        <Option value="Sinusoidal">类正弦函数</Option>
                      </Select>
                    </td>
                    <td />
                    <td>
                      <Select
                        labelInValue
                        defaultValue={{ key: "general" }}
                        style={{ width: 120 }}
                        onChange={this.handleChangeSelect}
                      >
                        <Option value="general">一般</Option>
                        <Option value="Subdata">子数据</Option>
                      </Select>
                    </td>
                    <td>
                      <Select
                        labelInValue
                        defaultValue={{ key: "1" }}
                        style={{ width: 90 }}
                        onChange={this.handleChangeSelect}
                      >
                        <Option value="1">1秒</Option>
                        <Option value="5">5秒</Option>
                        <Option value="10">10秒</Option>
                        <Option value="30">30秒</Option>
                        <Option value="60">1分钟</Option>
                        <Option value="300">5分钟</Option>
                        <Option value="900">15分钟</Option>
                        <Option value="1800">30分钟</Option>
                        <Option value="3600">1小时</Option>
                        <Option value="10800">3小时</Option>
                        <Option value="32400">6小时</Option>
                        <Option value="64800">12小时</Option>
                        <Option value="129600">24小时</Option>
                      </Select>
                    </td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => sendIoItem(item)}
                        size="small"
                        style={{ marginRight: "10px" }}
                      >
                        启动
                    </Button>
                      <Popconfirm
                        title="您确定要删除此数据吗?"
                        onConfirm={() => this.handledeleteSingleData(item)}
                        onCancel={this.cancel}
                        okText="确定"
                        cancelText="取消"
                      >
                        <Button type="danger" size="small">
                          删除
                      </Button>
                      </Popconfirm>
                    </td>
                    <td>
                      <Select
                        labelInValue
                        defaultValue={{ key: "wanting" }}
                        style={{ width: 120 }}
                        onChange={this.handleChangeSelect}
                      >
                        <Option value="wanting">无</Option>
                        <Option value="Fire">火灾</Option>
                        <Option value="LeakingWater">漏水</Option>
                        <Option value="Intrusion">闯入</Option>
                        <Option value="UPSTemperatureTooHigh">UPS温度过高</Option>
                      </Select>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {indexList.length === 0 ? <Empty style={{ marginTop: 20 }} /> : null}
        <Pagination
          className={`pagination`}
          simple
          onChange={this.pagination}
          defaultCurrent={1}
          hideOnSinglePage
          total={(properties.length / pageSize) * 10}
        />
      </div>
    );
  }

  // 删除单条数据
  handledeleteSingleData = item => {
    let { deleteSingleData, properties } = this.props;
    if (deleteSingleData === undefined) return;
    // 发送Delete请求 删除
    deleteSingleData(item, properties);
    message.success("删除成功");
  };

  cancel(e) {
    message.error("取消删除");
  }

  handleChangeSelect(e) {
    console.log(e);
  }

  // 函数弹出框
  handleChangeSelectFunction = e => {
    switch (e.key) {
      case "PolylineCycle":
        this.setState({
          PolylineCycle: true
        });
        break;
      case "VolatilityValue":
        this.setState({
          VolatilityValue: true
        });
        break;
      case "RandomValue":
        this.setState({
          RandomValue: true
        });
        break;
      case "Sinusoidal":
        this.setState({
          Sinusoidal: true
        });
        break;
      default:
        return;
    }
  };

  // 确认 关闭 变化函数弹板
  handleOk = text => {
    switch (text) {
      case "PolylineCycle":
        this.setState({
          PolylineCycle: false
        });
        break;
      case "VolatilityValue":
        this.setState({
          VolatilityValue: false
        });
        break;
      case "RandomValue":
        this.setState({
          RandomValue: false
        });
        break;
      case "Sinusoidal":
        this.setState({
          Sinusoidal: false
        });
        break;
      default:
        return;
    }
  };

  // 取消 关闭 变化函数弹板
  handleCancel = text => {
    switch (text) {
      case "PolylineCycle":
        this.setState({
          PolylineCycle: false
        });
        break;
      case "VolatilityValue":
        this.setState({
          VolatilityValue: false
        });
        break;
      case "RandomValue":
        this.setState({
          RandomValue: false
        });
        break;
      case "Sinusoidal":
        this.setState({
          Sinusoidal: false
        });
        break;
      default:
        return;
    }
  };

  // 切换 页码 
  pagination = e => {
    // 获取 一页几条数据
    let { pageSize, switchPage } = this.props;
    if (switchPage === undefined) return;
    let data = this.props.properties.slice(pageSize * (e - 1), pageSize * (e - 1) + pageSize);
    // 改变数据
    this.props.switchPage(data);
  };

  HandlerDeleteData() { }

  HandleChange(value, id, index) {
    console.log(12);
  }

  buttonMoth(title) {
    console.log(title);
  }
  
  onChange() { }
}

// es6 模块导出
export default OuterCover;
