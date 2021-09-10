import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { EventsResponseBody, TermsResponseBody } from "../types";

export const dataApi = createApi({
    reducerPath: 'youtube',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1/'
    }),

    endpoints: (builder) => ({
        getData: builder.query<TermsResponseBody, number | void>({
            query: (termCode) => `courses/${termCode}`
        }),

        getEvents: builder.query<EventsResponseBody, number>({
            query: (termCode) => `events/${termCode}`
        })
    })
})

// auto-generated based on the defined endpoints
export const { useGetDataQuery, useGetEventsQuery } = dataApi