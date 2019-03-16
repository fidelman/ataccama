import { appName } from '../config'
import { Record, List } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'
import fromJSOrdered from '../utilities/from-js-ordered'

/**
 * Constants
 */
export const moduleName = 'users'
const prefix = `${appName}/${moduleName}`

export const FETCH_USERS_REQUEST = `${prefix}/FETCH_USERS_REQUEST`
export const FETCH_USERS_SUCCESS = `${prefix}/FETCH_USERS_SUCCESS`
export const FETCH_USERS_FAIL = `${prefix}/FETCH_USERS_FAIL`

export const TOGGLE_SHOW = `${prefix}/TOGGLE_SHOW`
export const REMOVE_USER = `${prefix}/REMOVE_USER`

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
        .set('entities', fromJSOrdered(payload.data)) // to keep order of properties

    case TOGGLE_SHOW:
      return state.updateIn(
        ['entities', ...payload.nestingLevel, 'data', 'isOpen'],
        (isOpen) => !isOpen
      )

    case REMOVE_USER:
      if (payload.nestingLevel.length !== 1) {
        const parent = state.getIn([
          'entities',
          ...payload.nestingLevel.slice(0, -1)
        ])

        if (parent.size === 1)
          return state.deleteIn([
            'entities',
            ...payload.nestingLevel.slice(0, -2)
          ])
      }
      return state.deleteIn(['entities', ...payload.nestingLevel])
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
  (users) => {
    return users.get('entities').toJS()
  }
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

export const toggleShow = (nestingLevel) => ({
  type: TOGGLE_SHOW,
  payload: { nestingLevel }
})

export const removeUser = (nestingLevel) => ({
  type: REMOVE_USER,
  payload: { nestingLevel }
})
