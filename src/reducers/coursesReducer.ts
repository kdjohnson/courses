import { Course } from './../store/types/Course'
import { Registration } from './../store/types/Registration'
import { CourseActions } from './../store/types/CourseActions'
export interface CoursesState {
  books: object,
  courses: Course[],
  fetching: boolean,
  fetched: boolean,
  error: boolean,
  regs: object,
  updating: boolean
}

const initialState: CoursesState = {
    books: {},
    courses: [],
    fetching: false,
    fetched: false,
    error: false,
    regs: {},
    updating: false
}

export default function coursesReducer(
  state = initialState,
  action: CourseActions
) : CoursesState {
  switch (action.type) {
    case 'FETCH_COURSES_START': {
      return { ...state, fetching: true, fetched: false, error: false }
    }
    case 'FETCH_COURSES_ERROR': {
      return { ...state, fetching: false, fetched: true, error: true }
    }
    case 'RECEIVE_COURSES': {
      if (action.payload.courses === null) {
        return {
          ...state,
          // courses: null,
          fetching: false,
          fetched: true,
          error: true
        }
      }

      // TODO: RENAME VAR
      let tmp: string[] = []
      action.payload.courses.forEach(course => {
        if(!tmp.includes(course.registrationStatusDescription)) {
          tmp.push(course.registrationStatusDescription)
        }
      })

      let regs: Registration = {}
      tmp.forEach(desc => {
        regs[desc] = true
      })

      return {
        ...state,
        fetching: false,
        fetched: true,
        courses: action.payload.courses,
        books: action.payload.bookXML,
        regs: regs,
        error: false
      }
    }

    case 'UPDATING_REGS': {
      return { ...state, updating: true, error: false }
    }
    case 'UPDATE_REGS': {
      return { ...state, regs: action.payload, updating: false, error: false }
    }

    default:
      return state
  }
}