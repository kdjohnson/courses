import React, { Suspense, useEffect } from 'react'
import CoursesTabs from './components/CoursesTabs'
import { fetch_courses } from './actions/coursesActions'
import { fetch_events } from './actions/eventsActions'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetch_courses('current-term'))
    dispatch(fetch_events('current'))
  }, [dispatch])

  return (
    <Suspense fallback={<div />}>
      <CoursesTabs />
    </Suspense>
  )
}

export default App
