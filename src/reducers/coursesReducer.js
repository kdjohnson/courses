export default function reducer(
  state = {
    books: null,
    courses: [],
    fetching: false,
    fetched: false,
    error: false,
    regs: null,
    updating: false
  },
  action
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
      let set = new Set()
      for (let i = 0; i < action.payload.courses.length; i++) {
        set.add(action.payload.courses[i].registrationStatusDescription)
      }

      let regs = {}
      for (let type of set) {
        regs[type] = true
      }
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
