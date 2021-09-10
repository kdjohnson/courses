import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Term } from "../types"

interface SelectedTermState { code: number, start: string, end: string }


const initialState: SelectedTermState = { code: 0, start: '', end: '' }

const selectedTermSlice = createSlice({
    name: 'selectedTermSlice',
    initialState,
    reducers: {
        updateTerm: (state, action: PayloadAction<Term>) => {
            state.code = action.payload.code
            state.start = action.payload.start
            state.end = action.payload.end
        }
    }
})

export const { updateTerm } = selectedTermSlice.actions

export default selectedTermSlice.reducer