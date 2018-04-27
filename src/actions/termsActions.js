import { get_terms } from '../api/api'

export function fetch_terms() {
  const terms_url = 'http://localhost:8082/api/terms'
  return function(dispatch) {
    dispatch({ type: 'FETCH_TERMS_START', payload: {} })
    get_terms(terms_url)
      .then(terms => {
        dispatch({ type: 'RECEIVE_TERMS', payload: terms })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_TERMS_ERROR', payload: err })
      })
  }
}

export function set_current_term(new_term) {
  return function(dispatch) {
    dispatch({ type: 'RECEIVE_CURRENT_TERM', payload: new_term})
  }
}