import { get_courses } from '../api/api'
import { Term } from './../store/types/Term'
import { Dispatch } from 'react'

const courses_url = 'http://localhost:8082/api/courses'

export function fetch_courses(new_term: Term) {
    return function(dispatch: Dispatch<any>) {
        dispatch({type: 'FETCH_COURSES_START', payload: {}})
        get_courses(new_term, courses_url)
    }
}