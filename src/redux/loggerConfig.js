import { Iterable, Record } from 'immutable'

export default {
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
