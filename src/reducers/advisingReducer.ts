import { AdvisingActions } from './../store/types/AdvisingActions'

export interface AdvisingState {
  advising: boolean,
  fetching: boolean,
  fetched: boolean,
  error: object
}

export const initialState: AdvisingState = {
  advising: false,
  fetching: false,
  fetched: false,
  error: {}
}

export default function reducer(
  state: AdvisingState = initialState,
  action: AdvisingActions
) : AdvisingState {
  switch (action.type) {
    case 'FETCH_ADVISING_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_ADVISING_ERROR': {
      return { ...state, fetching: false, error: action.payload.error }
    }
    case 'RECEIVE_ADVISING': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        advising: action.payload.advising
      }
    }
    default:
      return state 
  }
}
