import React, { Suspense, useEffect, useState } from 'react'
import 'iterators-polyfill' // This is for supporting IE 😢
import AdvisingTabs from './components/AdvisingTabs'
import CircularProgress from '@material-ui/core/CircularProgress'
import CoursesTabs from './components/CoursesTabs'
import ErrorMessages from './components/ErrorMessages'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_advising } from './actions/advisingActions'
import { fetch_terms } from './actions/termsActions'
import { makeStyles } from '@material-ui/styles';

const calendar_obj = {
  url: 'http://localhost:8082/api/calendar',
  credentialsNeeded: false
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },

  progress: {
    margin: `0 ${theme.spacing(2)}px`
  },

  loading: {
    display: 'flex',
    justifyContent: 'center'
  }
}))

const App = props => {
  const [mobile, setMobile] = useState(false)
  const classes = useStyles()
  const isAdvisor = useSelector(state => state.advising.advising)
  const terms_fetched = useSelector(state => state.terms.fetched)
  const advising_fetching = useSelector(state => state.advising.fetching);
  const terms_fetching = useSelector(state => state.terms.fetching)
  const advising_error = useSelector(state => state.advising.error)
  const terms_error = useSelector(state => state.terms.error)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch_terms())
    dispatch(fetch_advising())
    
    window.addEventListener('resize', () => { document.getElementById('root').clientWidth < 650 ? setMobile(true) : setMobile(false)})
    if (document.getElementById('root').clientWidth < 650) {
      setMobile(true)
    }
  }, [dispatch])


  if (terms_fetching === true || advising_fetching === true) {
    return (
      <div className={classes.loading}>
        <CircularProgress
          color="secondary"
          className={classes.progress}
          size={50}
        />
      </div>
    )
  }

  if (terms_fetched === true) {
    if (terms_error === true || advising_error === true) {
      return (
        <div className={classes.loading}>
          <ErrorMessages />
        </div>
      )
    }
  }

  if (isAdvisor === true && terms_fetched) {
    return (
      <Suspense fallback={<div />}>
        <AdvisingTabs
          mobile={mobile}
          root_element={props.root_element}
          calendar_url={calendar_obj}
        />
      </Suspense>
    )
  } else {
    return (
      <Suspense fallback={<div />}>
        <CoursesTabs
          mobile={mobile}
          root_element={props.root_element}
          calendar_url={calendar_obj}
        />
      </Suspense>
    )
  }
}

export default App