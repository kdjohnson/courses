import { Term } from './Term'

export enum TermActionTypes {
    FETCH_TERMS_START = "FETCH_TERMS_START",
    FETCH_TERMS_ERROR = "FETCH_TERMS_ERROR",
    RECEIVE_TERMS = "RECEIVE_TERMS",
    RECEIVE_CURRENT_TERM = "RECEIVE_CURRENT_TERM"
}

export interface FetchStart {
    type: TermActionTypes.FETCH_TERMS_START
}

export interface FetchError {
    type: TermActionTypes.FETCH_TERMS_ERROR
}

export interface FetchTermsSuccess {
    type: TermActionTypes.RECEIVE_TERMS,
    payload: {
        terms: Term[],
        error: boolean
    }
}

export interface FetchCurrentTermSuccess {
    type: TermActionTypes.RECEIVE_CURRENT_TERM,
    payload: {
        current_term: Term,
        start: string,
        end: string
    }
}

export type TermActions = FetchStart | FetchError | FetchTermsSuccess | FetchCurrentTermSuccess