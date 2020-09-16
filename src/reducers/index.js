const initial_state = {
  books: '',
  credits: [],
  terms: [],
  courses: [],
  fetching: false,
  fetched: false,
  error: false,
  term_bounds: null,
  selected_term: null,
  events: [],
}

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case 'FETCH_EVENTS_START':
    case 'FETCH_COURSES_START':
    case 'FETCH_SELECTED_COURSES_START': {
      return { ...state, fetching: true, fetched: false, error: false }
    }
    case 'FETCH_EVENTS_ERROR':
    case 'FETCH_COURSES_ERROR':
    case 'FETCH_SELECTED_COURSES_ERROR': {
      return { ...state, fetching: false, fetched: true, error: true }
    }
    case 'RECEIVE_EVENTS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        error: false,
        events: action.payload,
      }
    }
    case 'RECEIVE_COURSES': {
      let selected_term,
        term_start,
        term_end = null

      if (
        action.payload.courses === null ||
        action.payload.terms === [] ||
        action.payload.terms === null ||
        action.payload.error === true
      ) {
        return {
          ...state,
          fetching: false,
          fetched: true,
          error: true,
        }
      }

      action.payload.terms.forEach((term) => {
        if (term.current) {
          selected_term = term
          term_start = selected_term.start
          term_end = selected_term.end
        }
      })

      const term_bounds = [term_start, term_end]

      return {
        ...state,
        fetching: false,
        fetched: true,
        courses: action.payload.courses,
        books: action.payload.books,
        terms: action.payload.terms,
        selected_term: selected_term,
        term_bounds: term_bounds,
        credits: action.payload.credit,
        error: false,
      }
    }

    case 'RECEIVE_SELECTED_COURSES': {
      return {
        ...state,
        courses: action.payload.data.courses,
        books: action.payload.data.books,
        fetching: false,
        fetched: true,
        error: false,
      }
    }

    case 'UPDATE_TERM': {
      let term_start = action.payload.start
      let term_end = action.payload.end
      const term_bounds = [term_start, term_end]
      return {
        ...state,
        term_bounds: term_bounds,
        selected_term: action.payload,
      }
    }

    default:
      return state
  }
}
