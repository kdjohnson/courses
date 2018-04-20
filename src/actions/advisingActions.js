import { get_advising } from '../api/api'

export function fetch_advising(current_term) {
  const advising_url = 'http://localhost:8082/api/advising'
  return function(dispatch) {
    dispatch({ type: 'FETCH_ADVISING_START', payload: {}})
    get_advising(advising_url)
      .then(advising => {
        dispatch({ type: 'RECEIVE_ADVISING', payload: advising })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_ADVISING_ERROR', payload: err })
      })
  }
}

