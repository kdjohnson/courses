export enum AdvisingActionTypes {
    FETCH_ADVISING_START = "FETCH_ADVISING_START",
    FETCH_ADVISING_ERROR = "FETCH_ADVISING_ERROR",
    RECEIVE_ADVISING = "RECEIVE_ADVISING"
}

export interface FetchStart {
    type: AdvisingActionTypes.FETCH_ADVISING_START
}

export interface FetchError {
    type: AdvisingActionTypes.FETCH_ADVISING_ERROR,
    payload: {
        error: object
    }
}

export interface FetchSuccess {
    type: AdvisingActionTypes.RECEIVE_ADVISING,
    payload: {
        advising: boolean
    }

}

export type AdvisingActions = FetchStart | FetchError | FetchSuccess