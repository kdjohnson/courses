import { applyMiddleware, createStore } from 'redux'

import logger from 'redux-logger'
import reducer from './reducers'
import thunk from 'redux-thunk'

let middleware = null

if (process.env.NODE_ENV === 'production') {
  middleware = applyMiddleware(thunk)
} else {
  middleware = applyMiddleware(thunk, logger)
}

export default createStore(reducer, middleware)
