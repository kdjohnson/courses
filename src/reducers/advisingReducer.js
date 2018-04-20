export default function reducer(
  state = {
    advising: false,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case 'FETCH_ADVISING_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_ADVISING_ERRORS': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'RECEIVE_ADVISING': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        advising: action.payload,
      }
    }

    default:
      return state
  }
}
