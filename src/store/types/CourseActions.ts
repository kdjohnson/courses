import { Course } from './Course'

export enum CourseActionTypes {
    FETCH_COURSES_START = "FETCH_COURSES_START",
    FETCH_COURSES_ERROR = "FETCH_COURSES_ERROR",
    RECEIVE_COURSES = "RECEIVE_COURSES",
    UPDATING_REGS = "UPDATING_REGS",
    UPDATE_REGS = "UPDATE_REGS"
}

export interface FetchStart {
    type: CourseActionTypes.FETCH_COURSES_START
}

export interface FetchError {
    type: CourseActionTypes.FETCH_COURSES_ERROR
}

export interface FetchSuccess {
    type: CourseActionTypes.RECEIVE_COURSES,
    payload: {
        courses: Course[],
        bookXML: object
    }
}

export interface UpdatingRegs {
    type: CourseActionTypes.UPDATING_REGS
}

export interface UpdateRegs {
    type: CourseActionTypes.UPDATE_REGS,
    payload: {
        regs: object // change to regs
    }
}

export type CourseActions = FetchStart | FetchError | FetchSuccess | UpdatingRegs | UpdateRegs