export { }
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Credit } from '../../types'

// interface CreditsState {
//     credits: Credit[],
//     fetching: boolean,
//     fetched: boolean,
//     error: boolean
// }

// interface CreditPayload {
//     credits: Credit[],
//     error: boolean
// }

// const initialState: CreditsState = {
//     credits: [],
//     fetching: false,
//     fetched: false,
//     error: false
// }

// const creditsSlice = createSlice({
//     name: 'credits',
//     initialState,
//     reducers: {
//         fetchCreditsStart: (state, _action) => {
//             return { ...state, fetching: true, fetched: false }
//         },

//         fetchCreditsError: (state, action: PayloadAction<CreditPayload>) => {
//             return { ...state, fetching: false, error: action.payload.error }
//         },

//         receiveCredits: (state, action) => {
//             return {
//                 ...state,
//                 fetching: false,
//                 fetched: true,
//                 credits: action.payload.credits,
//             }
//         }
//     }
// })

// export const { fetchCreditsStart, fetchCreditsError, receiveCredits } = creditsSlice.actions

// export default creditsSlice.reducer