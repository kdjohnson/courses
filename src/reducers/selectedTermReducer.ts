import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { termsApi } from '../services/termsApi'
import { Term } from '../types'

export const update = createAction<number>('selectedTerm/update')

const initialState1: number  = 0

const selectedTermReducer = createReducer(initialState1, (builder) => {
    builder
        .addCase(update, (state, action) => {
            state = action.payload
        })
})

export default selectedTermReducer
