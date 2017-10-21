const SET_ARTICLE = 'SET_ARTICLE'

// ================================
// Action Creator
// ================================
const setArticle = article => dispatch => {
  return dispatch({
    type: SET_ARTICLE,
    payload: article
  })
}

/* default 导出所有 Action Creators */
export default {
  setArticle
}

// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [SET_ARTICLE]: (nowArticle, { payload }) => {
    console.log('------------actions:', payload)
    return {
        ...nowArticle,
        title: payload.title,
        content: payload.content
      }
  }
}
