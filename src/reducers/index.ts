import { combineReducers } from '@reduxjs/toolkit'
import { coursesApi } from '../features/coursesApi'
import selectedTermSlice from './selectedTermSlice'

const rootReducer = combineReducers({
    [coursesApi.reducerPath]: coursesApi.reducer,
    selectedTerm: selectedTermSlice,
})

export default rootReducer