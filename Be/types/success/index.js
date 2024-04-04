const STATUS = require('../../constant/status')

const AUDIO_SUCCESS = {
  SoftDelete: {
    status: STATUS.SUCCESS,
    message: 'Delete file success',
    type: 'AUDIO_SUCCESS',
  },
}

const TODO_SUCCESS = {
  SoftDelete: {
    status: STATUS.SUCCESS,
    message: 'Delete todo success',
    type: 'TODO_SUCCESS',
  },
  ChangeStatus: {
    status: STATUS.SUCCESS,
    message: 'Chaneg TODO_SUCCESS todo success',
    type: 'CHANGE_STATUS_TODO_SUCCESS',
  },
}

const USER_SUCCESS = {
  changeRole: {
    status: STATUS.SUCCESS,
    message: 'Change role success',
    type: 'USER_SUCCESS',
  },
}

module.exports = {
  AUDIO_SUCCESS,
  TODO_SUCCESS,
  USER_SUCCESS,
}
