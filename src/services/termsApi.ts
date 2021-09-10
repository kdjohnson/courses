import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Term, TermsResponseBody } from './../types'

export const termsApi = createApi({
    tagTypes: ['Terms'],
    reducerPath: 'terms',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api/v1/' }),
    endpoints: (builder) => ({
        getTerms: builder.query<TermsResponseBody, void>({
            query: () => `terms`
        }),

        getTermsByTermCode: builder.query<TermsResponseBody, number>({
            query: (termCode) =>  `courses/${termCode}`
        }),
    })
})


export const getCurrentTerm = (terms?: Term[]): Term => {
    let currentTerm: Term = {
        description: '',
        code: 0,
        start: '',
        end: '',
        current: false
    }

    try {
        if (terms !== undefined) {
            for (let term of terms) {
                if (term.current) {
                    currentTerm = term;
                }
            }
        }

        return currentTerm
    } catch (err) {
        throw (err)
    }

};

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTermsQuery, useGetTermsByTermCodeQuery, usePrefetch } = termsApi