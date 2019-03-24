import Axios from '../../axios/index.js';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

const ERROR_MSG = 'ERROR_MSG';
// const IO_OPEN = 'IO_OPEN';
// const IO_CLOSE = 'IO_CLOSE';
const ADD_SINGLE_DATA = 'ADD_SINGLE_DATA';

// let io = null;
// 默认值
const initState = {
  msg: '',
  // 數據源列表
  allDataSources: [],
  // 獲取到的總數據
  properties: [],
  // 展示的數據
  indexList: [{
    canshuzhi: "{'maxAlarmValue:50,'maxValue:100,'minAlarmValue:30,'minValue:0,'propertyId': '1}",
    changePropertyId: "2",
    changeTime: 5000,
    dataSourceId: 1,
    detailsDes: "嗷嗷嗷",
    id: 1,
    isChangeStatus: "0",
    methodId: 1,
    simpleDes: "无",
    status: "0",
    value: "0"
  }, {
    canshuzhi: "{'maxAlarmValue:50,'maxValue:100,'minAlarmValue:30,'minValue:0,'propertyId': '1}",
    changePropertyId: "2",
    changeTime: 5000,
    dataSourceId: 1,
    detailsDes: "嗷嗷嗷",
    id: 2,
    isChangeStatus: "0",
    methodId: 1,
    simpleDes: "无",
    status: "0",
    value: "0"
  }],
  // 頁面展示條數
  pageSize: 10,
  // 查看的數據
  data: [{
    key: '8',
    name: 'Jim Red',
    age: 32,
  }]
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
    case ADD_SINGLE_DATA:
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

// 獲取数据源数据 數據第一次切割
export function getDataUp(data = {
  id: 1
}, pageSize = 0) {
  return dispatch => {
    Axios.get('/dataSource/getDatas', {
      params: data
    }).then(response => {
      if (response.status === 200 && response.data.code === 200) {
        let data = response.data.data;
        data.indexList = response.data.data.properties.slice(0, pageSize);
        dispatch(registerSuccess(data));
      } else {
        dispatch(errorMsg(response.data.msg));
      }
    }, err => {
      throw new Error(err);
    })
  }
}

// 切换 页码
export function switchPage(data) {
  return dispatch => {
    dispatch(registerSuccess({
      indexList: data
    }));
  }
}

// 单次获取数据 数据列表
export function getFirstData() {
  return dispatch => {
    Axios.get('/dataSource/getAllDataSources').then(response => {
      if (response.data.code === 200 && response.data.data.length > 0) {
        dispatch(registerSuccess({
          allDataSources: response.data.data
        }));
      }
    }, err => {
      throw new Error(err);
    })
  }
}

// 开始  关闭 数据源
export function setSourceData(data) {
  return dispatch => {
    console.log(data);
    // Axios.post('/dataSource/OpenOrCloseDataSource', {
    //   dataSource: data
    // }).then(response => {
    //   console.log(response)
    // }, error => {
    //   throw new Error(error);
    // })
    // dispatch(registerSuccess(data));
  }
}

// 當前輸入的數據
export function setSourceDataInput(data) {
  return dispatch => {
    dispatch(registerSuccess(data));
  }
}

// 添加单个数据
export function addSingleData(data, properties) {
  return dispatch => {
    Axios.post('/dataSource/addData', data).then(response => {
      if (response.data.code === 200) {
        if (properties.length < 10) {
          // let newProperties = properties.concat([]);
          // newProperties.push(data);
          // dispatch(registerSuccess({
          //   properties: newProperties
          // }));
        }
      }
    }, error => {
      throw new Error(error);
    })
  }
}

// 删除单个数据
export function deleteSingleData(dataCue, properties) {
  return dispatch => {
    Axios.delete('/dataSource/deleteData', {
      data: {
        id: dataCue.id
      }
    }).then(response => {
      if (response.data.code === 200) {
        let Properties = properties.filter(item => {
          return item.id !== dataCue.id;
        })
        dispatch(registerSuccess({
          properties: Properties
        }));
      }
    }, error => {
      throw new Error(error);
    })
  }
}