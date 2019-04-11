import Axios from '../../axios/index.js';
import {
  message
} from 'antd';
import deepCopy from '../../utils/deepCopy.js';
import Delivery from '../../utils/delivery.js';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// 默认值
const initState = {
  sourceId: -1,
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

export function dataSource(state = initState, action) {
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
  return async dispatch => {
    try {
      const response = await Axios.get('/getDatas', {
        params: data
      });
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
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 单次获取数据 数据列表
export function getFirstData() {
  return async dispatch => {
    try {
      const response = await Axios.get('/getAllDataSources');
      let data = response.data;
      if (data.code === 200) {
        dispatch(registerSuccess({
          allDataSources: data.data
        }));
      } else {
        message.error(data.data);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 开始  关闭 数据源
export function setSourceData(properties, sourceId, status, sendTime, name) {
  return async dispatch => {
    try {
      const response = await Axios.put('/OpenOrCloseDataSource', {
        id: sourceId,
        properties: properties,
        status: status,
        sendTime: sendTime,
        name
      });
      let data = response.data;
      if (data.code === 200) {
        dispatch(registerSuccess({
          status: status
        }));
      } else {
        message.error(data.data);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 打印输出数据
export function printSendData(id) {
  return async dispatch => {
    try {
      const response = await Axios.get('/printSendData', {
        params: {
          id: id
        }
      });
      let data = response.data;
      if (data.code === 200) {
        dispatch(registerSuccess({
          message: data.data
        }))
      } else {
        message.error(data.data);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 启动 停用 数据
export function openOrCloseUseData(newProperties, item, pageNum, pageSize) {
  return async dispatch => {
    try {
      const response = await Axios.put('/openOrCloseData', item);
      let data = response.data;
      if (data.code === 200) {
        // 截取 一页数据
        let newIndexList = Delivery({
          array: newProperties,
          pageNum,
          pageSize
        });
        dispatch(registerSuccess({
          properties: newProperties,
          indexList: newIndexList
        }));
        message.success(data.msg);
      } else {
        message.error(data.msg);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 删除一條数据源
export function deleteDataSource({
  id,
  allDataSources
}) {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/deleteDataSource/${id}`);
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
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 添加单个数据
export function addSingleData({
  data,
  properties,
  indexList,
  pageSize,
  pageNum
}) {
  return async dispatch => {
    try {
      const response = await Axios.post('/addData', data);
      let newData = response.data;
      if (newData.code === 200) {
        message.success(newData.msg);
        if (indexList.length < 10) {
          let newProperties = properties.concat(newData.data);
          let newIndexList = Delivery({
            array: newProperties,
            pageNum,
            pageSize
          })
          dispatch(registerSuccess({
            properties: newProperties,
            indexList: newIndexList
          }));
        } else {
          let newProperties = properties.concat(newData.data);
          dispatch(registerSuccess({
            properties: newProperties
          }));
        }
      } else {
        message.error(newData.msg);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 删除单个数据
export function deleteSingleData({
  item,
  properties,
  pageNum,
  pageSize
}) {
  return async dispatch => {
    try {
      const response = await Axios.delete(`/deleteData/${item.id}`);
      if (response.data.code === 200) {
        let newProperties = properties.filter(newItem => {
          return newItem.id !== item.id;
        });
        let newIndexList = Delivery({
          array: newProperties,
          pageNum,
          pageSize
        });
        dispatch(registerSuccess({
          properties: newProperties,
          indexList: newIndexList
        }));
        message.success("删除成功");
      } else {
        message.error('删除失败');
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 绑定关联数据
export function bindParentData({
  id
}) {
  return async dispatch => {
    try {
      const response = await Axios.get(`/bindParentData?id=${id}`);
      let data = response.data;
      if (data.code === 200) {
        message.success('成功');
        dispatch(registerSuccess({
          parentData: data.data
        }));
      } else {
        message.error('失败');
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 创建一條数据源
export function addDataSource({
  data,
  allDataSources
}) {
  return async dispatch => {
    try {
      const response = await Axios.post('/addDataSource', data);
      if (response.data.code === 200) {
        let newAllDataSources = allDataSources.concat(response.data.data);
        dispatch(registerSuccess({
          allDataSources: newAllDataSources
        }));
        message.success(response.data.msg);
      } else {
        message.error(response.data.msg);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 改變 单条数据
export function changeData({
  itemValue,
  id,
  properties,
  pageSize,
  pageNum,
  field
}) {
  return dispatch => {
    let newProperties = deepCopy(properties);
    for (let i = 0; i < newProperties.length; i++) {
      if (id === newProperties[i].id) {
        let item = newProperties[i];
        item[field] = itemValue;
      }
    }
    let newIndexList = Delivery({
      array: newProperties,
      pageNum,
      pageSize
    });
    dispatch(registerSuccess({
      properties: newProperties,
      indexList: newIndexList
    }));
  }
}

// 改變 单条数据
export function changeDataFun({
  itemValueOne,
  itemValueTwo,
  id,
  properties,
  pageSize,
  pageNum,
  fieldOne,
  fieldTwo
}) {
  return dispatch => {
    let newProperties = deepCopy(properties);
    for (let i = 0; i < newProperties.length; i++) {
      if (id === newProperties[i].id) {
        let item = newProperties[i];
        item[fieldOne] = itemValueOne;
        item[fieldTwo] = itemValueTwo;
      }
    }
    let newIndexList = Delivery({
      array: newProperties,
      pageNum,
      pageSize
    });
    dispatch(registerSuccess({
      properties: newProperties,
      indexList: newIndexList
    }));
  }
}

// 启用 关闭 事件 状态
export function importantAlarm({
  id,
  importantAlarmId,
  pageNum,
  pageSize
}) {
  return async dispatch => {
    try {
      const response = await Axios.get(`/importantAlarm?id=${id}&importantAlarmId=${importantAlarmId}`);
      if (response.data.code === 200) {
        message.success(response.data.msg);
        let properties = response.data.data.properties;
        if (properties.length < 10) {
          dispatch(registerSuccess({
            properties: properties,
            indexList: properties
          }))
        } else {
          let newIndexList = Delivery({
            array: properties,
            pageNum,
            pageSize
          });
          dispatch(registerSuccess({
            properties: properties,
            indexList: newIndexList
          }))
        }
      } else {
        message.error(response.data.msg);
      }
    } catch(err) {
      throw new Error(err);
    }
  }
}

// 切换页面 改变ID
export function changeSurceId({
  id
}) {
  return dispatch => {
    dispatch(registerSuccess({
      sourceId: id
    }))
  }
}