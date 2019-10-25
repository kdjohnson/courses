import { get_advising } from '../api/api'
import { Term } from './../store/types/Term'
import { Dispatch } from 'redux'

export function fetch_advising(current_term: Term) {
  const advising_url = 'http://localhost:8082/api/advising'
  return function(dispatch: Dispatch<any>) {
    dispatch({ type: 'FETCH_ADVISING_START', payload: {} })
    get_advising(advising_url)
      .then(advising => {
        dispatch({ type: 'RECEIVE_ADVISING', payload: advising })
      })
      .catch(err => {
        dispatch({ type: 'FETCH_ADVISING_ERROR', payload: err })
      })
  }
}
