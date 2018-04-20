export default function reducer(
  state = {
    credits: null,
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case 'FETCH_CREDITS_START': {
      return { ...state, fetching: true, fetched: false }
    }
    case 'FETCH_CREDITS_ERRORS': {
      return { ...state, fetching: false, error: action.payload }
    }
    case 'RECEIVE_CREDITS': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        credits: action.payload,
      }
    }

    default:
      return state
  }
}

