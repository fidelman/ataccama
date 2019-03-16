import { Iterable, Record } from 'immutable'

export const fetchDataUrl = '/db.json'
export const appName = 'ataccama-test-app'
export const isDevelopment = process.env.NODE_ENV === 'development'
export const loggerConfig = {
  collapsed: true,
  stateTransformer: (state) => {
    const newState = {}

    for (const i of Object.keys(state)) {
      if (Iterable.isIterable(state[i]) || state[i] instanceof Record) {
        newState[i] = state[i].toJS()
      } else {
        newState[i] = state[i]
      }
    }

    return newState
  }
}
