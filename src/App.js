import React, { Suspense, useEffect, useState } from 'react'
import CoursesTabs from './components/CoursesTabs'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_courses } from './actions/coursesActions'

const calendar_obj = {
  url: 'http://localhost:8090/v1/events/current',
  credentialsNeeded: false
}

const App = props => {
  const [mobile, setMobile] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_courses("current-term"))

    window.addEventListener('resize', () => { window.innerWidth < 650 ? setMobile(true) : setMobile(false)})
    if (window.innerWidth < 650) {
      setMobile(true)
    }
  }, [dispatch, mobile])

  return (
    <Suspense fallback={<div />}>
      <CoursesTabs
        mobile={mobile}
        root_element="courses-soffit"
        calendar_url={calendar_obj}
      />
    </Suspense>
  )
}

export default App
