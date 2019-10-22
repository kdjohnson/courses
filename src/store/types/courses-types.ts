export const FETCH_COURSES_START = 'FETCH_COURSES_START'
export const FETCH_COURSES_ERROR = 'FETCH_COURSES_ERROR'
export const RECEIVE_COURSES = 'RECEIVE_COURSES'
export const UPDATING_REGS = 'UPDATING_REGS'
export const UPDATE_REGS = 'UPDATE_REGS'

export interface CoursesPayload {
    fetching: boolean,
    fetched: boolean,
    error: boolean
}

interface FetchCoursesAction {
    type: typeof FETCH_COURSES_START,
    payload: CoursesPayload
}