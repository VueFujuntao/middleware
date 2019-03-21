import React from "react";
// 性能提升库
import { fromJS } from "immutable";
import { connect } from "react-redux";
import { Button, Pagination, Popconfirm, message, Select } from "antd";
// PropTypes props类型检查
import PropTypes from "prop-types";
// import deepCopy from "../../utils/deepCopy.js";
import "./index.less";
import { addSingleData } from "../../redux/module/one";

const Option = Select.Option;
// @方法 ：装饰器写法

// 传入redux
@connect(
  // 数据挂载在当前组件的 props 上
  state => state.one,
  {  addSingleData }
)
class EntranceGuard extends React.Component {
  // 以随意为每一个属性指定类型。这对于我们检查和处理属性的意外赋值非常有用。
  static propTypes = {
    properties: PropTypes.array,
    getDataUp: PropTypes.func,
    stopIoItem: PropTypes.func,
    sendIoItem: PropTypes.func,
    deleteSingleData: PropTypes.func
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
      number: 110
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
  render() {
    /*
      最外层需要一个元素包裹
      写类 需要 className 因为 class 与 es class语法糖 冲突
    */
    let { properties, pageSize, stopIoItem, sendIoItem } = this.props;
    return (
      <div className="less-context">
        <button onClick={() => this.goee()}>添加</button>
        <table border="1" cellPadding="5" cellSpacing="5" className="table">
          <thead>
            <tr>
              <th>密钥</th>
              <th>属性名称</th>
              <th>设备描述</th>
              <th>时间间隙</th>
              <th>状态值</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item, index) => {
              return (
                <tr key={item.id} className="table-tr">
                  <td>{item.keyValue}</td>
                  <td>{item.attributeName}</td>
                  <td>{item.deviceDescription}</td>
                  <td>
                    <Select
                      labelInValue
                      defaultValue={{ key: "lucy" }}
                      style={{ width: 120 }}
                      onChange={this.handleChangeSelect}
                    >
                      <Option value="jack">10S</Option>
                      <Option value="lucy">30S</Option>
                    </Select>
                    ,
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-focus"
                      onChange={e => this.HandleChange(e, item.id, index)}
                      value={item.statusValue}
                    />
                  </td>
                  <td>
                    <span
                      className={[
                        "animate-span",
                        index % 2 === 0 ? "animate" : null
                      ].join(" ")}
                    />
                  </td>
                  <td>
                    <Button
                      type="primary"
                      onClick={() => sendIoItem(item)}
                      size="small"
                      style={{ marginRight: "10px" }}
                    >
                      发送
                    </Button>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => stopIoItem(item)}
                      style={{ marginRight: "10px" }}
                    >
                      暂停
                    </Button>
                    <Popconfirm
                      title="您确定要删除此任务吗?"
                      onConfirm={() => this.confirm(item)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type="danger" size="small">
                        删除
                      </Button>
                    </Popconfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          className="pagination"
          simple
          onChange={this.pagination}
          defaultCurrent={1}
          total={pageSize * 10}
        />
      </div>
    );
  }

  confirm = item => {
    this.props.deleteSingleData(item, this.props.properties);
    message.success("删除成功");
  };

  cancel(e) {
    message.error("取消删除");
  }

  handleChangeSelect(e) {
    console.log(e);
  }

  // 切换页码
  pagination = e => {
    this.props.getDataUp({ id: 1, page: e, size: 10 });
  };

  HandlerDeleteData() {}

  HandleChange(value, id, index) {
    console.log(12);
    /*
      方法里访问this时 使用箭头函数
      或者 在构造函数里 通过
        this.changeHandle = this.changeHandle.bind(this)
      传入this
    */
    // let data = deepCopy(this.state.data);
    // for (let i = 0; i < data.length; i++) {
    //   if (id === data[i].id) {
    //     if (isNaN(parseFloat(value.target.value))) return;
    //     data[i].statusValue = `${parseFloat(value.target.value)}℃`;
    //     this.setState({
    //       data: data
    //     });
    //   }
    // }
  }
}

// es6 模块导出
export default EntranceGuard;
