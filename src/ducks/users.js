import { appName } from '../config'
import { Record, fromJS, List } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const FETCH_USERS_REQUEST = `${prefix}/FETCH_USERS_REQUEST`
export const FETCH_USERS_SUCCESS = `${prefix}/FETCH_USERS_SUCCESS`
export const FETCH_USERS_FAIL = `${prefix}/FETCH_USERS_FAIL`

/**
 * Reducer
 */
export const ReducerRecord = Record({
  loading: false,
  loaded: false,
  entities: List([]),
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_USERS_REQUEST:
      return state.set('loading', true).set('error', null)

    case FETCH_USERS_FAIL:
      return state.set('loading', false).set('error', payload.error)

    case FETCH_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .update('entities', (entities) => entities.concat(fromJS(payload.data)))

    default:
      return state
  }
}

/**
 * Selectors
 */
export const usersSelector = (state) => state[moduleName]
export const getUsersSelector = createSelector(
  usersSelector,
  (users) => users.get('entities').toJS()
)

export const isErrorSelector = createSelector(
  usersSelector,
  (users) => users.get('error')
)
export const isLoadedSelector = createSelector(
  usersSelector,
  (users) => users.get('loaded')
)
export const isLoadingSelector = createSelector(
  usersSelector,
  (users) => users.get('loading')
)

/**
 * Action Creators
 */

export const fetchAllUsers = () => (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST })
  api
    .fetchData()
    .then((data) =>
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: { data }
      })
    )
    .catch((error) =>
      dispatch({
        type: FETCH_USERS_FAIL,
        payload: { error }
      })
    )
}
