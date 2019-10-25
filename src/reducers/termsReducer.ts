import { Term } from './../store/types/Term'
import { TermActions } from './../store/types/TermActions'
interface TermState {
    terms: Term[],
    fetching: boolean,
    fetched: boolean,
    error: boolean,
    current_term: Term,
    term_bounds: number[]
}

const initialState: TermState = {
    terms: [],
    fetching: false,
    fetched: false, 
    error: false,
    current_term: {
        code: "",
        description: "",
        end: "",
        id: 0,
        is_current_term: "",
        start: ""
    },
    term_bounds: []
}

export default function reducer(
    state = initialState,
    action: TermActions
  ) : TermState {
    switch (action.type) {
      case 'FETCH_TERMS_START': {
        return { ...state, fetching: true, fetched: false }
      }
      case 'FETCH_TERMS_ERROR': {
        return { ...state, fetching: false, fetched: true, error: true }
      }
      case 'RECEIVE_TERMS': {
        let current_term: Term,
          term_start: number,
          term_end: number = null
  
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
  
        action.payload.terms.forEach((term: Term) => {
          if (term.is_current_term === 'true') {
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
          current_term: action.payload.current_term,
          term_bounds: term_bounds
        }
      }
      default:
        return state
    }
  }
  