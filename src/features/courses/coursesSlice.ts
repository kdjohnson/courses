export { }
// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import { get_courses } from '../../api/api'
// import { Course, Credit, Term } from '../../types'

// const courses_url = '/v1/courses/'

// interface CoursesState {
//     books: string,
//     courses: Course[],
//     fetching: boolean,
//     fetched: boolean,
//     error: boolean,
//     updating: boolean,
//     terms: Term[],
//     term_bounds: string[],
//     credits: Credit[]
// }

// interface CoursesPayload {
//     courses: Course[],
//     books: string,
//     credit: Credit,
//     terms: Term[],
//     error: boolean,
//     credits: Credit[]
// }


// const initialState: CoursesState = {
//     books: '',
//     courses: [],
//     fetching: false,
//     fetched: false,
//     error: false,
//     updating: false,
//     terms: [],
//     term_bounds: [],
//     credits: []
// }

// // First, create the thunk
// export const fetchCourses = createAsyncThunk(
//     'courses/fetchStart',
//     async (term, _thunkAPI) => {
//         const data = await get_courses(term, courses_url)
//         return data
//     }
// )

// const coursesSlice = createSlice({
//     name: 'courses',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addDefaultCase((_state, _action) => { })
//         builder.addCase(fetchCourses.pending, (state, _action: PayloadAction<unknown>) => {
//             state.fetching = true;
//             state.fetched = false;
//             state.error = false;
//         });

//         builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<CoursesPayload>) => {
//             let selected_term: { start: string; end: string },
//                 term_start: string = '',
//                 term_end: string = ''

//             if (
//                 action.payload.courses === null ||
//                 action.payload.terms === [] ||
//                 action.payload.terms === null ||
//                 action.payload.error === true
//             ) {
//                 state.fetching = false;
//                 state.fetched = true;
//                 state.error = true;
//             }

//             action.payload.terms.forEach((term: Term) => {
//                 if (term.current) {
//                     selected_term = term
//                     term_start = selected_term.start
//                     term_end = selected_term.end
//                 }
//             })

//             const term_bounds = [term_start, term_end];

//             state.fetching = false;
//             state.fetched = true;
//             state.courses = action.payload.courses;
//             state.books = action.payload.books;
//             state.terms = action.payload.terms;
//             state.term_bounds = term_bounds;
//             state.credits = action.payload.credits;
//             state.error = false;
//         })
//     }

    // reducers: {
    //     fetchCoursesStart: (state, _action) => {
    //         return { ...state, fetching: true, fetched: false, error: false }
    //     },

    //     fetchError: (state, _action) => {
    //         return { ...state, fetching: false, fetched: true, error: true }
    //     },

    //     receiveCourses: (state, action: PayloadAction<CoursesPayload>) => {
    //         let selected_term: { start: string; end: string },
    //             term_start: string,
    //             term_end: string = null

    //         if (
    //             action.payload.courses === null ||
    //             action.payload.terms === [] ||
    //             action.payload.terms === null ||
    //             action.payload.error === true
    //         ) {
    //             return {
    //                 ...state,
    //                 fetching: false,
    //                 fetched: true,
    //                 error: true,
    //             }
    //         }

    //         action.payload.terms.forEach((term: Term) => {
    //             if (term.current) {
    //                 selected_term = term
    //                 term_start = selected_term.start
    //                 term_end = selected_term.end
    //             }
    //         })

    //         const term_bounds = [term_start, term_end]

    //         return {
    //             ...state,
    //             fetching: false,
    //             fetched: true,
    //             courses: action.payload.courses,
    //             books: action.payload.books,
    //             terms: action.payload.terms,
    //             selected_term: selected_term,
    //             term_bounds: term_bounds,
    //             credits: action.payload.credit,
    //             error: false,
    //         }
    //     }
// })

// export const { fetchCoursesStart, fetchError, receiveCourses } = coursesSlice.actions

// export default coursesSlice.reducer