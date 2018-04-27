export default function reducer(
  state = { books: null, courses: [], fetching: false, fetched: false, error: null },
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
      return {
        ...state,
        fetching: false,
        fetched: true,
        courses: action.payload.courses,
        books: action.payload.booksXML
      }
    }

    default:
      return state
  }
}
