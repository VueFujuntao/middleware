import Axios from 'axios';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

// 默认值
const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: ''
}

export function one(state=initState, action) {
  switch(action.type) {
    case ERROR_MSG:
      return {...state}
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

export function register({
  user,
  pwd,
  type,
  repeatpwd
}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户密码必须输入');
  }
  if (repeatpwd !== pwd) {
    return errorMsg('密码和确认密码不同');
  }
  return dispatch => {
    Axios.post('/user/register', {user, pwd, type}).then(response => {
      if (response.status === 200 && response.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(response.data.msg))
      }
    }, err => {
      throw new Error(err)
    })
  }
}
