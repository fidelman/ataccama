import { combineReducers } from 'redux'
import usersReducer, { moduleName as usersModule } from '../ducks/users'

const reducers = {
  [usersModule]: usersReducer
}

export default combineReducers(reducers)
