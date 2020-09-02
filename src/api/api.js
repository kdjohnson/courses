/* global token */
/* global is_demo */

import courses from './courses.json'
import events from './events.json'

export const get_courses = async (term, url) => {
  if (is_demo) {
    return courses
  }

  try {
    const response = await fetch(url + term, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const get_events = async (term, url) => {
  if (is_demo) {
    return events
  }

  try {
    const response = await fetch(url + term, {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })

    const data = await response.json()
    return data
  } catch (err) {
    return err
  }
}

export const generate_pdf = async (term_code) => {
  if (is_demo) {
    return
  }

  try {
    const response = await fetch('/v1/courses/' + term_code + '/pdf', {
      credentials: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/pdf',
        Authorization: 'Bearer ' + token,
      },
    })

    await response.body
      .getReader()
      .read()
      .then((data) => {
        const blob = new Blob([data.value], { type: 'application/pdf' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = 'course-list.pdf'
        link.click()
      })
  } catch (err) {
    return err
  }
}
