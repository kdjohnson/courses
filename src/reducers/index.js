const initial_state = {
    books: null,
    credits: null,
    terms: [],
    courses: [],
    fetching: false,
    fetched: false,
    error: false,
    term_bounds: null,
    selected_term: null,
    visible: false
}

export default function reducer(state = initial_state, action) {
  switch (action.type) {
    case 'FETCH_COURSES_START': 
    case 'FETCH_SELECTED_COURSES_START': {
      return { ...state, visible: false, fetching: true, fetched: false, error: false }
    }
    case 'FETCH_COURSES_ERROR': 
    case 'FETCH_SELECTED_COURSES_ERROR': {
      return { ...state, visible: false, fetching: false, fetched: true, error: true }
    }
    case 'RECEIVE_COURSES': {
      let selected_term, term_start, term_end = null

      if (action.payload.courses === null ||
          action.payload.terms === [] ||
          action.payload.terms === null ||
          action.payload.error === true
      ) {
        return {
          ...state,
          fetching: false,
          fetched: true,
          visible: false,
          error: true
        }
      }

      action.payload.terms.forEach(term => {
        if (term.current) {
          selected_term = term
          term_start = parseInt(selected_term.start, 10)
          term_end = parseInt(selected_term.end, 10)
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
        visible: true
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
        visible: true
      }
    }

    case 'UPDATE_TERM': {
      let term_start = parseInt(action.payload.start, 10)
      let term_end = parseInt(action.payload.end, 10)
      const term_bounds = [term_start, term_end]
      return {
        ...state, 
        term_bounds: term_bounds,
        selected_term: action.payload,
        visible: false
      }
    }

    default:
      return state
  }
}
