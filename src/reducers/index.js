import { combineReducers } from 'redux'

import courses from './coursesReducer'
import terms from './termsReducer'
import advising from './advisingReducer'
import credits from './creditsReducer'

export default combineReducers({
  terms,
  courses,
  credits,
  advising
})
