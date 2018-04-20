import {applyMiddleware, createStore} from 'redux'

import logger from "redux-logger"
import thunk from "redux-thunk"
//import promise from "redux-promise-middlewar"

import reducer from './reducers'

const middleware = applyMiddleware(thunk, logger)

export default createStore(reducer, middleware)