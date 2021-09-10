import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { CourseData, CoursesRequestBody } from './../types'

const courses_url = '/v1/courses/'
// Define a service using a base URL and expected endpoints
export const coursesApi = createApi({
    tagTypes: ['Courses'],
    baseQuery: fetchBaseQuery({ baseUrl: 'localhost:8080' }),
    endpoints: (builder) => ({
        getCourses: builder.query<CourseData, void>({
            query: () => courses_url
        }),

        postCourses: builder.mutation<CourseData, CoursesRequestBody>({
            query: (body) => ({
                url: courses_url,
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify(body)
            })
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCoursesQuery, usePostCoursesMutation } = coursesApi