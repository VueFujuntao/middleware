import React from "react";
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
// PropTypes props类型检查
import PropTypes from 'prop-types';
import './index.less';

@connect(
  state => state.one
)
class EntranceGuard extends React.Component {
  static propTypes = {
    type: PropTypes.string
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(fromJS(nextProps).equals(fromJS(this.props)) && fromJS(nextState).equals(fromJS(this.state)));
  }
  
  render() {
    return (
      <div className="less">EntranceGuard</div>
    );
  }
}

export default EntranceGuard;
