import { combineReducers } from '@reduxjs/toolkit'
import { dataApi } from '../api/dataApi'
import selectedTermSlice from './selectedTermSlice'

const rootReducer = combineReducers({
    selectedTerm: selectedTermSlice,
    [dataApi.reducerPath]: dataApi.reducer,
})

export default rootReducer
