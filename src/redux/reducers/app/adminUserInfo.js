import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/app/adminUserInfo'
import initState from 'STORE/initState'

export default createReducer(initState.adminUserInfo, ACTION_HANDLERS)
