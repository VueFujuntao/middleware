import Axios from '../../axios/index.js';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

const ERROR_MSG = 'ERROR_MSG';
const IO_OPEN = 'IO_OPEN';
const IO_CLOSE = 'IO_CLOSE';
const ADD_SINGLE_DATA = 'ADD_SINGLE_DATA';

let io = null;
// 默认值
const initState = {
  msg: '',
  allDataSources: [],
  indexList: [],
  io: false,
  pageSize: 10
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
    case IO_OPEN:
      return {
        ...state,
        ...action.payload
      }
    case IO_CLOSE:
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

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}

// webSocket启动失败
function IoOpen(data) {
  return {
    type: IO_OPEN,
    payload: data
  }
}

// webSocket启动成功
function IoClose(data) {
  return {
    type: IO_CLOSE,
    payload: data
  }
}

// 启动webSocket
export function startUpIo(obj) {
  if (initState.io) {
    io.send(obj);
  } else {
    return dispatch => {
      io = new WebSocket('ws://localhost:12460/webs');
      io.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        io.send('打开');
        dispatch(IoOpen({
          io: true
        }))
      };

      io.onmessage = function (evt) {
        let received_msg = evt.data;
        console.log(evt);
        console.log(received_msg);
      };

      io.onclose = function () {
        // 关闭 websocket
        console.log('关闭');
      };
    }
  }
}

// 关闭webSocket
export function closeIo() {
  return dispatch => {
    io.close();
    dispatch(IoClose({
      io: false
    }))
  }
}

export function indexListPage(data) {

}

// 获取分页数据 和 数据源数据
export function getDataUp(data = {
  id: 1
}) {
  return dispatch => {
    Axios.get('/dataSource/getDatas', {
      params: data
    }).then(response => {
      if (response.status === 200 && response.data.code === 200) {
        let data = response.data.data;
        data.indexList = response.data.data.properties.slice(0, 10);
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

// 启动  关闭 数据源
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
          let newProperties = properties.concat([]);
          newProperties.push(data);
          dispatch(registerSuccess({
            properties: newProperties
          }));
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