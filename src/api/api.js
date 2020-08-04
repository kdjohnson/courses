/* global token */

import courses from './courses.json'
import events from './events.json'

export const get_courses = async (is_demo, term, url) => {
  if (is_demo) {
    return courses
  }

  try {
    const response = await fetch(url + term, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token 
      }
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const get_events = async (is_demo, term, url) => {
  if (is_demo) {
    return events
  }
  
  try {
    const response = await fetch(url + term, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token 
      }
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}