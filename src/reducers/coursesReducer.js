export default function reducer(
  state = {
    books: null,
    courses: [],
    fetching: false,
    fetched: false,
    error: null,
    regs: null,
    updating: false
  },
  action
) {
  switch (action.type) {
    case 'FETCH_COURSES_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_COURSES_ERRORS': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'RECEIVE_COURSES': {
      if (action.payload.courses === null) {
        return {
          ...state,
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
        regs: regs
      }
    }

    case 'UPDATING_REGS': {
      return { ...state, updating: true }
    }
    case 'UPDATE_REGS': {
      console.log('update regs')
      console.log(action.payload)
      return { ...state, regs: action.payload, updating: false }
    }

    default:
      return state
  }
}
