import { combineReducers } from 'redux'
import adminUserInfo from './adminUserInfo'
import nowArticle from './nowArticle'

export default combineReducers({
	adminUserInfo: adminUserInfo,
	nowArticle: nowArticle
})
