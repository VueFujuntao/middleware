import React from "react";
// 性能提升库
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
// PropTypes props类型检查
import PropTypes from 'prop-types';
import './index.less';

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
  }
  /*
    构造函数 添加一个类构造函数来初始化状态 this.state
    注意传递 props 到基础构造函数的
  */
  constructor(props) {
    super(props)
    /*
    this.state 定义数据,数据是响应的
    修改数据,例子： this.setstate({date: 1})
    */ 
    this.state = {date: 0}
  }

  // 组件挂载前
  componentWillMount() {
  }

  // 组件挂载后
  componentDidMount() {
  }

  // 组件销毁前
  componentWillUnmount() {
  }
  /*
    props state 更新 此钩子函数将被调用 接收两个参数，更新后的props, state
    react在更新时，会存在误更新，数据没有发生变化就更新了，此处用来提升性能
  */
  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  
  render() {
    /*
      最外层需要一个元素包裹
      写类 需要 className 因为 class 与 es class语法糖 冲突
    */
    return (
      <div className="less">
        <input type="text"  onChange={this.changeHandle}/>
        <div>{this.state.date}</div>
      </div>
    );
  }

  changeHandle = (vlaue) => {
    /*
      方法里访问this时 使用箭头函数
      或者 在构造函数里 通过
        this.changeHandle = this.changeHandle.bind(this)
      传入this
    */
    this.setState({
      date: vlaue.target.value
    })
  }
}

// es6 模块导出
export default EntranceGuard;
