import advising from './advisingReducer'
import courses from './coursesReducer'
import credits from './creditsReducer'
import terms from './termsReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  // terms,
  courses: courses,
  // credits,
  advising: advising
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer