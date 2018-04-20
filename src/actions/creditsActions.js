import { get_credits } from '../api/api'

export function fetch_credits() {
  const grades_url = "http://localhost:8082/api/credits"
  return function(dispatch) {
    dispatch({ type: 'FETCH_CREDITS_START', payload: {}})
    get_credits(grades_url)
      .then(credits => {
        dispatch({ type: 'RECEIVE_CREDITS', payload: credits })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_CREDITS_ERROR', payload: err })
      })
  }
}