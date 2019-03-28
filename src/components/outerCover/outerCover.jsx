import React from "react";
// 性能提升库
import { fromJS } from "immutable";
// 蚂蚁 UI
import { Button, Pagination, Popconfirm, message, Select, Empty } from "antd";
// PropTypes props类型检查
import PropTypes from "prop-types";
import deepCopy from "../../utils/deepCopy.js";
import Delivery from "../../utils/delivery.js";
import FunctionFunc from "./functionFunc/functionFunc.jsx";
import "./index.less";
const Option = Select.Option;

class OuterCover extends React.Component {
  // 以随意为每一个属性指定类型。这对于我们检查和处理属性的意外赋值非常有用。
  static propTypes = {
    // 总数据
    properties: PropTypes.array,
    // 当前页的数据
    indexList: PropTypes.array,
    // 页面数据几条
    pageSize: PropTypes.number,
    // 当前页码
    pageNum: PropTypes.number,
    // 删除单个数据
    deleteSingleData: PropTypes.func,
    // 添加单个数据
    addSingleData: PropTypes.func,
    // 切换页码
    switchPage: PropTypes.func,
    // 开启 关闭数据
    openOrCloseUseData: PropTypes.func,
    // 切换当前页码
    switchPageNum: PropTypes.func,
    // 修改单条数据
    changeData: PropTypes.func
  };

  // 设置默认 props 值
  static defaultProps = {
    // 总数据
    properties: [],
    // 当前页的数据
    indexList: [],
    // 一页 几条数据
    pageSize: 0,
    // 当前页码
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
      functionVis: false,
      functionNum: 1,
      itemId: -1
    };
  }

  // 组件初始化时只调用，以后组件更新不调用，整个生命周期只调用一次，此时可以修改state。
  componentWillMount() {}

  // 组件渲染之后调用，只调用一次。
  componentDidMount() {}

  // 组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps(nextProps) {}
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
  componentWillUpdate(nextProps, nextState) {}

  // 组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
  componentDidUpdate() {}

  // 组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
  componentWillUnmount() {}

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
      // 一页 几条数据
      pageSize,
      // 当前页码
      pageNum
    } = this.props;

    return (
      <div className="less-context">
        <FunctionFunc
          functionVis={this.state.functionVis}
          functionNum={this.state.functionNum}
          handleOk={this.handleOk}
          itemId={this.state.itemId}
        />
        <table border="1" cellPadding="5" cellSpacing="5" className="table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>序号</th>
              <th style={{ width: "150px" }}>KEY</th>
              <th style={{ width: "150px" }}>VALUE</th>
              <th style={{ width: "150px" }}>是否影响报警</th>
              <th style={{ width: "150px" }}>变化函数</th>
              <th>描述</th>
              <th style={{ width: "100px" }}>类型</th>
              <th style={{ width: "120px" }}>变化时间</th>
              <th style={{ width: "138px" }}>操作</th>
              <th style={{ width: "100px" }}>关联事件</th>
            </tr>
          </thead>
          <tbody>
            {indexList.map((item, index) => {
              return (
                <tr key={item.id} className="table-tr">
                  <th>{index + 1 + (pageNum - 1) * 10}</th>
                  <td>{item.id}</td>
                  <td>
                    <input
                      className="input-focus"
                      type="text"
                      value={item.value}
                      onChange={e =>
                        this.handleChangeSelect({
                          e,
                          item,
                          field: "value",
                          bool: true
                        })
                      }
                    />
                  </td>
                  <th>{item.isChangeStatus === 0 ? "是" : "否"}</th>
                  <td>
                    {item.isParentData === 0 ? (
                      <Select
                        labelInValue
                        defaultValue={
                          item.methodId === 1
                            ? { key: "no" }
                            : item.methodId === 2
                            ? { key: "PolylineCycle" }
                            : item.methodId === 3
                            ? { key: "VolatilityValue" }
                            : item.methodId === 4
                            ? { key: "RandomValue" }
                            : item.methodId === 5
                            ? { key: "Sinusoidal" }
                            : { key: "no" }
                        }
                        style={{ width: 140 }}
                      >
                        <Option
                          onClick={() => this.changeSelectFunction(1, item)}
                          value="no"
                        >
                          无
                        </Option>
                        <Option
                          onClick={() => this.changeSelectFunction(2, item)}
                          value="PolylineCycle"
                        >
                          折线周期函数
                        </Option>
                        <Option
                          onClick={() => this.changeSelectFunction(3, item)}
                          value="VolatilityValue"
                        >
                          波动取值函数
                        </Option>
                        <Option
                          onClick={() => this.changeSelectFunction(4, item)}
                          value="RandomValue"
                        >
                          随机取值函数
                        </Option>
                        <Option
                          onClick={() => this.changeSelectFunction(5, item)}
                          value="Sinusoidal"
                        >
                          类正弦函数
                        </Option>
                      </Select>
                    ) : (
                      "无"
                    )}
                  </td>
                  <td>{item.detailsDes}</td>
                  <td>
                    <Select
                      labelInValue
                      defaultValue={
                        item.isParentData === 0
                          ? { key: "0" }
                          : item.isParentData === 1
                          ? { key: "1" }
                          : { key: "0" }
                      }
                      style={{ width: 120 }}
                      onChange={e =>
                        this.handleChangeSelect({
                          e,
                          item,
                          field: "isParentData",
                          bool: false
                        })
                      }
                    >
                      <Option value="0">一般</Option>
                      <Option value="1">子数据</Option>
                    </Select>
                  </td>
                  <td>
                    {item.isParentData === 0 ? (
                      <Select
                        labelInValue
                        defaultValue={
                          item.changeTime === 1000
                            ? { key: "1000" }
                            : item.changeTime === 5000
                            ? { key: "5000" }
                            : item.changeTime === 10000
                            ? { key: "10000" }
                            : item.changeTime === 30000
                            ? { key: "30000" }
                            : item.changeTime === 60000
                            ? { key: "60000" }
                            : item.changeTime === 300000
                            ? { key: "300000" }
                            : item.changeTime === 900000
                            ? { key: "900000" }
                            : item.changeTime === 1800000
                            ? { key: "1800000" }
                            : item.changeTime === 3600000
                            ? { key: "3600000" }
                            : item.changeTime === 10800000
                            ? { key: "10800000" }
                            : item.changeTime === 32400000
                            ? { key: "32400000" }
                            : item.changeTime === 64800000
                            ? { key: "64800000" }
                            : item.changeTime === 129600000
                            ? { key: "129600000" }
                            : { key: "0" }
                        }
                        style={{ width: 90 }}
                        onChange={e =>
                          this.handleChangeSelect({
                            e,
                            item,
                            field: "changeTime",
                            bool: false
                          })
                        }
                      >
                        <Option value="0">无</Option>
                        <Option value="1000">1秒</Option>
                        <Option value="5000">5秒</Option>
                        <Option value="10000">10秒</Option>
                        <Option value="30000">30秒</Option>
                        <Option value="60000">1分钟</Option>
                        <Option value="300000">5分钟</Option>
                        <Option value="900000">15分钟</Option>
                        <Option value="1800000">30分钟</Option>
                        <Option value="3600000">1小时</Option>
                        <Option value="10800000">3小时</Option>
                        <Option value="32400000">6小时</Option>
                        <Option value="64800000">12小时</Option>
                        <Option value="129600000">24小时</Option>
                      </Select>
                    ) : (
                      "无"
                    )}
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() =>
                        this.openOrCloseUseData(
                          item,
                          properties,
                          pageNum,
                          pageSize
                        )
                      }
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      {item.isOn === 1 ? "停用" : "启用"}
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
                      defaultValue={
                        item.importantAlarmId === 1
                          ? { key: "1" }
                          : item.importantAlarmId === 2
                          ? { key: "2" }
                          : item.importantAlarmId === 3
                          ? { key: "3" }
                          : item.importantAlarmId === 4
                          ? { key: "4" }
                          : item.importantAlarmId === 5
                          ? { key: "5" }
                          : { key: "wanting" }
                      }
                      style={{ width: 120 }}
                      onChange={e =>
                        this.handleChangeSelect({
                          e,
                          item,
                          field: "importantAlarmId",
                          bool: false
                        })
                      }
                    >
                      <Option value="1">无</Option>
                      <Option value="2">火灾</Option>
                      <Option value="3">漏水</Option>
                      <Option value="4">闯入</Option>
                      <Option value="5">UPS温度过高</Option>
                    </Select>
                  </td>
                </tr>
              );
            })}
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
    let { deleteSingleData, properties, pageSize, pageNum } = this.props;
    if (deleteSingleData === undefined) return;
    // 发送Delete请求 删除
    deleteSingleData({ item, properties, pageNum, pageSize });
  };

  // 启动关闭数据
  openOrCloseUseData(item, properties, pageNum, pageSize) {
    const { openOrCloseUseData } = this.props;
    // 数组对象深度克隆
    let newProperties = deepCopy(properties);
    for (let i = 0; i < newProperties.length; i++) {
      if (item.id === newProperties[i].id) {
        if (item.isOn === 0) {
          newProperties[i].isOn = 1;
          openOrCloseUseData(
            newProperties,
            newProperties[i],
            pageNum,
            pageSize
          );
        } else if (item.isOn === 1) {
          newProperties[i].isOn = 0;
          openOrCloseUseData(
            newProperties,
            newProperties[i],
            pageNum,
            pageSize
          );
        }
      }
    }
  }

  cancel(e) {
    message.error("取消删除");
  }

  // 打开填写
  changeSelectFunction = (e, item) => {
    if (e !== 1) {
      this.setState({
        functionVis: true,
        functionNum: e,
        itemId: item.id
      });
    } else {
      const { changeDataFun, properties, pageSize, pageNum } = this.props;
      changeDataFun({
        itemValueOne: "{}",
        itemValueTwo: e,
        id: item.id,
        properties,
        pageSize,
        pageNum,
        fieldOne: "canshuzhi",
        fieldTwo: "methodId"
      });
    }
  };

  // 确认 OK 关闭
  handleOk = (bool, result, functionNum, itemId) => {
    if (bool === true) {
      let data = JSON.stringify(result.getFieldsValue());
      const { changeDataFun, properties, pageSize, pageNum } = this.props;
      changeDataFun({
        itemValueOne: data,
        itemValueTwo: functionNum,
        id: itemId,
        properties,
        pageSize,
        pageNum,
        fieldOne: "canshuzhi",
        fieldTwo: "methodId"
      });
    } else {
    }
    // 清空表单
    result.resetFields();
    this.setState({
      functionVis: false,
      functionNum: 1,
      itemId: -1
    });
  };

  // 切换 页码
  pagination = e => {
    // 获取 一页几条数据
    let { pageSize, switchPage, switchPageNum, properties } = this.props;
    if (switchPage === undefined) return;
    let data = Delivery({ array: properties, pageNum: e, pageSize });
    // 修改当前页码
    switchPageNum(e);
    // 改变数据
    switchPage(data);
  };

  // 修改单条数据
  handleChangeSelect({ e, item, field, bool }) {
    let itemValue = item[field];
    if (bool === true) {
      itemValue = e.target.value;
    } else {
      itemValue = Number(e.key);
    }
    const { changeData, properties, pageSize, pageNum } = this.props;
    changeData({
      itemValue,
      id: item.id,
      properties,
      pageSize,
      pageNum,
      field
    });
  }
}

// es6 模块导出
export default OuterCover;
