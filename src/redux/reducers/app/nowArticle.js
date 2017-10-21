import createReducer from 'UTIL/createReducer'
import { ACTION_HANDLERS } from 'ACTION/app/nowArticle'
import initState from 'STORE/initState'

export default createReducer(initState.nowArticle, ACTION_HANDLERS)
