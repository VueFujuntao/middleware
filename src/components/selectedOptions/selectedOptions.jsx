import React from "react";
import { Select } from "antd";

class SelectWithHiddenSelectedOptions extends React.Component {
  static defaultProps = {
    parentData: []
  }
  constructor(props) {
    super(props);
    this.state = {
      // selectedItems: []
    };
  }

  render() {
    const { selectedItems, handleChange } = this.props;
    const filteredOptions = this.props.parentData.filter(
      o => !selectedItems.includes(o)
    );
    return (
      <Select
        mode="multiple"
        placeholder="Inserted are removed"
        value={selectedItems}
        onChange={handleChange}
        style={{ width: "100%" }}
      >
        {filteredOptions.map(item => (
          <Select.Option key={item.id} value={item.id}>
            {item.id} <span>|</span> {item.detailsDes}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

export default SelectWithHiddenSelectedOptions;
