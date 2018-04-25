import advising from './advisingReducer'
import { combineReducers } from 'redux'
import courses from './coursesReducer'
import credits from './creditsReducer'
import terms from './termsReducer'

export default combineReducers({
  terms,
  courses,
  credits,
  advising
})
