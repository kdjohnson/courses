export { }
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { Event } from '../../types'

// interface EventsState {
//     events: Event[],
//     fetching: boolean,
//     fetched: boolean,
//     error: boolean
// }

// interface EventsPayload {
//     events: Event[]
//     error: boolean
// }

// const initialState: EventsState = {
//     events: [],
//     fetching: false,
//     fetched: false,
//     error: false
// }

// const eventsSlice = createSlice({
//     name: 'credits',
//     initialState,
//     reducers: {
//         fetchEventsStart: (state, _action) => {
//             return { ...state, fetching: true, fetched: false, error: false }
//         },

//         fetchEventsError: (state, _action: PayloadAction<EventsPayload>) => {
//             return { ...state, fetching: false, fetched: true, error: true }
//         },

//         receiveEvents: (state, action) => {
//             return {
//                 ...state,
//                 fetching: false,
//                 fetched: true,
//                 error: false,
//                 events: action.payload,
//             }
//         }
//     }
// })

// export const { fetchEventsStart, fetchEventsError, receiveEvents } = eventsSlice.actions

// export default eventsSlice.reducer