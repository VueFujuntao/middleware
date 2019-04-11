import React from "react";
// 螞蟻 UI
import { Modal, Table, Icon, Input, Button } from "antd";
// 字體高亮插件
import Highlighter from "react-highlight-words";
// props 屬性檢測
import PropTypes from "prop-types";
// 性能保障
import { fromJS } from "immutable";
// 樣式
import "./index.less";
// import Item from "antd/lib/list/Item";

// 查看發送數據 值
export default class NumberSourcesMoth extends React.Component {
  // 定義 屬性
  static propTypes = {
    data: PropTypes.string,
    title: PropTypes.string,
    modalVisible: PropTypes.bool,
    setModalVisible: PropTypes.func
  };

  // 設置屬性默認值
  static defaultProps = {
    // 數據列表
    data: "",
    // 隱藏 顯示
    modalVisible: false,
    title: "數據"
  };

  constructor(props) {
    super(props);
    this.state = {
      // 搜索框值
      searchWords: ""
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  render() {
    // 定義列表
    const columns = [
      {
        title: "KEY",
        dataIndex: "key",
        key: "key",
        width: "30%",
        ...this.getColumnSearchProps("key")
      },
      {
        title: "Value",
        dataIndex: "value",
        key: "value",
        width: "70%"
      }
    ];
    let newData = [];
    const { title, data, modalVisible, setModalVisible } = this.props;
    if (data !== "") {
      newData = JSON.parse(data)[0].data;
    }
    return (
      <Modal
        className="modal-table"
        title={title}
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
      >
        <Table
          scroll={{ y: 340 }}
          columns={columns}
          dataSource={newData}
          pagination={{ pageSize: newData.length }}
        />
      </Modal>
    );
  }

  // 獲取搜索結果
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  // 搜索
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  // 重置 清空
  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
}
