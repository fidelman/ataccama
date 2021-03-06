import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'
import { isDevelopment } from '../config'
import loggerConfig from './loggerConfig'

const middlewares = [thunk]

if (isDevelopment) {
  middlewares.push(createLogger(loggerConfig))
}

const enhancer = applyMiddleware(...middlewares)

const store = createStore(reducer, enhancer)

if (isDevelopment) window.store = store

export default store
