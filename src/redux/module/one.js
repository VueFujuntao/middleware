import Axios from '../../axios/index.js';
import {
  message
} from 'antd';
import deepCopy from '../../utils/deepCopy.js';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// 默认值
const initState = {
  msg: '',
  // 數據源列表
  allDataSources: [],
  // 獲取到的總數據
  properties: [],
  // 展示的數據
  indexList: [],
  // 頁面展示條數
  pageSize: 10,
  // 当前页面
  pageNum: 1,
  // 输出数据
  message: '',
  // 关联的父数据
  parentData: []
}

export function one(state = initState, action) {
  switch (action.type) {
    case ERROR_MSG:
      return {
        ...state
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

// 成功調用
function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

// 失敗調用
function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}


export function indexListPage(data) {

}

// 當前輸入框的數據
export function setSourceDataInput(data) {
  return dispatch => {
    dispatch(registerSuccess(data));
  }
}

// 切换 页码截取数据
export function switchPage(data) {
  return dispatch => {
    dispatch(registerSuccess({
      indexList: data
    }));
  }
}

// 修改页码
export function switchPageNum(e) {
  return dispatch => {
    dispatch(registerSuccess({
      pageNum: e
    }))
  }
}

// 獲取数据源数据 數據第一次切割
export function getDataUp(data = {
  id: 1
}, pageSize = 0) {
  return dispatch => {
    Axios.get('/getDatas', {
      params: data
    }).then(response => {
      if (response.status === 200 && response.data.code === 200) {
        let data = response.data.data;
        if (response.data.data.properties !== undefined) {
          data.indexList = response.data.data.properties.slice(0, pageSize);
          dispatch(registerSuccess(data));
        } else {
          message.error('數據有問題');
        }
      } else {
        message.error(response.data.msg);
        dispatch(errorMsg(response.data.msg));
      }
    }, err => {
      throw new Error(err);
    })
  }
}

// 单次获取数据 数据列表
export function getFirstData() {
  return dispatch => {
    Axios.get('/getAllDataSources').then(response => {
      if (response.data.code === 200) {
        dispatch(registerSuccess({
          allDataSources: response.data.data
        }));
      } else {
        message.error(response.data.data);
      }
    }, err => {
      message.error('Request failed');
      throw new Error(err);
    })
  }
}

// 开始  关闭 数据源
export function setSourceData(properties, sourceId, status, sendTime, name) {
  return dispatch => {
    Axios.put('/OpenOrCloseDataSource', {
      id: sourceId,
      properties: properties,
      status: status,
      sendTime: sendTime,
      name
    }).then(response => {
      if (response.data.code === 200) {
        dispatch(registerSuccess({
          status: status
        }));
      } else {
        message.error(response.data.data);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 打印输出数据
export function printSendData(id) {
  return dispatch => {
    Axios.get('/printSendData', {
      params: {
        id: id
      }
    }).then(response => {
      if (response.data.code === 200) {
        dispatch(registerSuccess({
          message: response.data.data
        }))
      } else {
        message.error(response.data.data);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 启动 停用 数据
export function openOrCloseUseData(newProperties, item, pageNum, pageSize) {
  return dispatch => {
    Axios.put('/openOrCloseData', item).then(response => {
      if (response.data.code === 200) {
        let newIndexList = newProperties.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
        dispatch(registerSuccess({
          properties: newProperties,
          indexList: newIndexList
        }));
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 删除一條数据源
export function deleteDataSource(id, allDataSources) {
  return dispatch => {
    Axios.delete(`/deleteDataSource/${id}`).then(response => {
      if (response.data.code === 200) {
        let newAllDataSources = allDataSources.filter(item => {
          return item.id !== id;
        })
        dispatch(registerSuccess({
          allDataSources: newAllDataSources,
          properties: [],
          indexList: []
        }));
      } else {
        message.error(response.data.data);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 添加单个数据
export function addSingleData(data, properties, indexList, pageSize, pageNum) {
  return dispatch => {
    Axios.post('/addData', data).then(response => {
      if (response.data.code === 200) {
        message.success(response.data.msg);
        if (indexList.length < 10) {
          let newProperties = properties.concat(response.data.data);
          let newIndexList = newProperties.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
          dispatch(registerSuccess({
            properties: newProperties,
            indexList: newIndexList
          }));
        } else {
          let newProperties = properties.concat(response.data.data);
          dispatch(registerSuccess({
            properties: newProperties
          }));
        }
      } else {
        message.error(response.data.msg);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 删除单个数据
export function deleteSingleData(dataCue, properties, pageNum, pageSize) {
  return dispatch => {
    Axios.delete(`/deleteData/${dataCue.id}`).then(response => {
      if (response.data.code === 200) {
        let newProperties = properties.filter(item => {
          return item.id !== dataCue.id;
        });
        let newIndexList = newProperties.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
        dispatch(registerSuccess({
          properties: newProperties,
          indexList: newIndexList
        }));
        message.success("删除成功");
      } else {
        message.error('删除失败');
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 绑定关联数据
export function bindParentData(id) {
  return dispatch => {
    Axios.get(`/bindParentData?id=${id}`).then(response => {
      if (response.data.code === 200) {
        message.success('成功');
        dispatch(registerSuccess({
          parentData: response.data.data
        }));
      } else {
        message.error('失败');
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 创建一條数据源
export function addDataSource(data, allDataSources) {
  return dispatch => {
    Axios.post('/addDataSource', data).then(response => {
      if (response.data.code === 200) {
        let newAllDataSources = allDataSources.concat(response.data.data);
        dispatch(registerSuccess({
          allDataSources: newAllDataSources
        }));
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    }, error => {
      message.error('Request failed');
      throw new Error(error);
    })
  }
}

// 改變 Value
export function changeData(itemValue, id, properties, pageSize, pageNum, field) {
  return dispatch => {
    let newProperties = deepCopy(properties);
    for (let i = 0; i < newProperties.length; i++) {
      if (id === newProperties[i].id) {
        let item = newProperties[i];
        item[field] = itemValue;
        console.log(item[field]);
      }
    }
    let newIndexList = newProperties.slice(pageSize * (pageNum - 1), pageSize * (pageNum - 1) + pageSize);
    dispatch(registerSuccess({properties: newProperties, indexList: newIndexList}));
  }
}