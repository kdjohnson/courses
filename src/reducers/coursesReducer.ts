import { Course } from './../store/types/Course'
import { Registration } from './../store/types/Registration'
import { CourseActions } from './../store/types/CourseActions'
interface CoursesState {
  books: boolean,
  courses: Course[],
  fetching: boolean,
  fetched: boolean,
  error: object,
  regs: object,
  updating: boolean
}

const initialState: CoursesState = {
    books: false,
    courses: [],
    fetching: false,
    fetched: false,
    error: {},
    regs: {},
    updating: false
  
}
export default function coursesReducer(
  state = initialState,
  action: CourseActions
) {
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
          courses: null,
          fetching: false,
          fetched: true,
          error: true
        }
      }
      // let set = new Set()
      let tmp: string[] = []
      action.payload.courses.forEach(course => {
        if(!tmp.includes(course.registrationStatusDescription)) {
          tmp.push(course.registrationStatusDescription)
        }
      })
      // for (let i = 0; i < action.payload.courses.length; i++) {
      //   set.add(action.payload.courses[i].registrationStatusDescription)
      // }

      let regs: Registration = {}
      tmp.forEach(desc => {
        regs[desc] = true
      })

      // for (let type in set) {
      //   let tmp = set[type]
      //   regs[type] = true
      // }
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
      return initialState
  }
}
