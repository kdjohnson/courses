import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { coursesApi } from './features/coursesApi'
import logger from 'redux-logger'
import reducer from './reducers'
import thunk from 'redux-thunk'

export const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => {
        if (process.env.NODE_ENV === 'production') {
            return getDefaultMiddleware().concat(coursesApi.middleware).concat(thunk)
        } else {
            return getDefaultMiddleware().concat(coursesApi.middleware).concat(thunk).concat(logger)
        }
    }
})
setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch