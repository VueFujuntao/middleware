import React from "react";
// 性能提升库
import { fromJS } from "immutable";
import { connect } from "react-redux";
// PropTypes props类型检查
import PropTypes from "prop-types";
import "./index.less";

// @方法 ：装饰器写法

// 传入redux
@connect(
  // 数据挂载在当前组件的 props 上
  state => state.one
)
class EntranceGuard extends React.Component {
  // 以随意为每一个属性指定类型。这对于我们检查和处理属性的意外赋值非常有用。
  static propTypes = {
    type: PropTypes.string
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

    this.state = { date: 0 };
    this.changeHandle = this.changeHandle.bind(this);
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
    return (
      <div className="less">
        <input type="text" onChange={this.changeHandle} />
        <div>{this.state.date}</div>
      </div>
    );
  }
  changeHandle(vlaue) {
    /*
      方法里访问this时 使用箭头函数
      或者 在构造函数里 通过
        this.changeHandle = this.changeHandle.bind(this)
      传入this
    */
    this.setState({
      date: vlaue.target.value
    });
  }
}

// es6 模块导出
export default EntranceGuard;
