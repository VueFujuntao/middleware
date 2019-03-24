import React from "react";
import { Input, Tooltip } from "antd";
import PropTypes from "prop-types";

// 输入框 控件
export default class NumericInput extends React.Component {
  static propTypes = {
    value : PropTypes.number
  }

  static defaultProps = {
    value: 0
  }
  
  // 輸入匹配
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