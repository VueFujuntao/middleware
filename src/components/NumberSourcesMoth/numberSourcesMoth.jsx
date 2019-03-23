import React from 'react';
import { Modal, Table, Icon, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import PropTypes from "prop-types";
import { fromJS } from "immutable";
import './index.less';


// 查看發送數據 值
export default class NumberSourcesMoth extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    modalVisible: PropTypes.bool,
    setModalVisible: PropTypes.func
  }

  static defaultProps = {
    data: [],
    title: '數據'
  }

  constructor(props) {
    super(props);
    this.state = {
      // 隱藏關閉
      // modalVisible: true
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      fromJS(nextProps).equals(fromJS(this.props)) &&
      fromJS(nextState).equals(fromJS(this.state))
    );
  }

  render() {
    // 定義列表
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...this.getColumnSearchProps('name'),
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '70%'
    }];
    const { title, data, modalVisible, setModalVisible } = this.props;
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
          dataSource={data} />
      </Modal>
    )
  }

  // 獲取搜索結果
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
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
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  })

  // 搜索
  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  // 重置
  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }
}