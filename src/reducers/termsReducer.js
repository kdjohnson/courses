export default function reducer(
  state = {
    terms: [],
    fetching: false,
    fetched: false,
    error: false,
    current_term: null,
    term_bounds: null
  },
  action
) {
  switch (action.type) {
    case 'FETCH_TERMS_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_TERMS_ERROR': {
      return { ...state, fetching: false, fetched: true, error: true }
    }
    case 'RECEIVE_TERMS': {
      let current_term,
        term_start,
        term_end = null

      if (
        action.payload.terms === [] ||
        action.payload.terms === null ||
        action.payload.error === true
      ) {
        return {
          ...state,
          fetching: false,
          fetched: true,
          error: true
        }
      }

      action.payload.terms.forEach(term => {
        if (term.current === 'true') {
          current_term = term
          term_start = parseInt(current_term.start, 10)
          term_end = parseInt(current_term.end, 10)
        }
      })
      const term_bounds = [term_start, term_end]
      return {
        ...state,
        fetching: false,
        fetched: true,
        terms: action.payload.terms,
        current_term: current_term,
        term_bounds: term_bounds
      }
    }
    case 'RECEIVE_CURRENT_TERM': {
      let term_start = parseInt(action.payload.start, 10)
      let term_end = parseInt(action.payload.end, 10)
      const term_bounds = [term_start, term_end]
      return {
        ...state,
        current_term: action.payload,
        term_bounds: term_bounds
      }
    }
    default:
      return state
  }
}
