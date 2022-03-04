import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { EventsResponseBody, TermsResponseBody } from "../types";

export const coursesApi = createApi({
    reducerPath: 'coursesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/'
    }),

    endpoints: (builder) => ({
        getCourses: builder.query<TermsResponseBody, number | void>({
            query: (termCode) => `courses/${termCode}`
        }),

        getEvents: builder.query<EventsResponseBody, number>({
            query: (termCode) => `events/${termCode}`
        })
    })
})

// auto-generated based on the defined endpoints
export const { useGetCoursesQuery, useGetEventsQuery } = coursesApi