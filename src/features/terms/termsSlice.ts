export { }
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Term } from './../../types'

// interface TermPayload {
//     terms: Term[],
//     error: boolean,
//     term: Term,
//     start: string
//     end: string
// }

// interface TermsState {
//     terms: Term[],
//     fetching: boolean,
//     fetched: boolean,
//     error: boolean,
//     current_term: Term,
//     term_bounds: number[]
// }

// const initialState: TermsState = {
//     terms: [],
//     fetching: false,
//     fetched: false,
//     error: false,
//     current_term: {
//         description: '',
//         code: 0,
//         start: '',
//         end: '',
//         current: false
//     },
//     term_bounds: [],
// }

// const termsSlice = createSlice({
//     name: 'terms',
//     initialState,
//     reducers: {
//         fetchTermsStart: (state, _action) => {
//             return { ...state, fetching: true, fetched: false }
//         },

//         fetchTermsError: (state, _action) => {
//             return { ...state, fetching: false, fetched: true, error: true }
//         },

//         receiveTerms: (state, action: PayloadAction<TermPayload>) => {
//             if (
//                 action.payload.terms === [] ||
//                 action.payload.terms === null ||
//                 action.payload.error === true
//             ) {
//                 return {
//                     ...state,
//                     fetching: false,
//                     fetched: true,
//                     error: true,
//                     terms: [],
//                 }
//             }

//             let term_start = 0
//             let term_end = 0;
//             let current_term: Term = {
//                 description: '',
//                 code: 0,
//                 start: '',
//                 end: '',
//                 current: false
//             }



//             action.payload.terms.forEach((term: Term) => {
//                 if (term.current === true) {
//                     current_term = term
//                     term_start = parseInt(current_term.start, 10)
//                     term_end = parseInt(current_term.end, 10)
//                 }
//             })
//             const term_bounds: number[] = [term_start, term_end]
//             state.fetching = false;
//             state.fetched = true;
//             state.terms = action.payload.terms;
//             state.current_term = current_term
//             state.term_bounds = term_bounds
//         },

//         receiveCurrentTerm: (state, action: PayloadAction<TermPayload>) => {
//             let term_start = parseInt(action.payload.start, 10)
//             let term_end = parseInt(action.payload.end, 10)
//             const term_bounds = [term_start, term_end]
//             return {
//                 ...state,
//                 current_term: action.payload.term,
//                 term_bounds: term_bounds
//             }
//         }
//     }
// })

// export const { fetchTermsStart, fetchTermsError, receiveTerms, receiveCurrentTerm } = termsSlice.actions

// export default termsSlice.reducer