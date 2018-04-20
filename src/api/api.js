export const get_terms = async url => {
  try {
    const response = await fetch(url)
    const terms = await response.json()
    return terms.terms
  } catch (err) {
    return err
  }
}

export const get_courses = async (term, url) => {
  try {
    const response = await fetch(url, {
      body: JSON.stringify({ code: term.code }),
      method: 'POST'
    })
    const courses = await response.json()
    return courses.courses
  } catch (err) {
    return err
  }
}

export const get_credits = async url => {
  try {
    const response = await fetch(url)
    const credits = await response.json()
    return credits.gpa
  } catch (err) {
    return err
  }
}

export const get_advising = async url => {
  try {
    const response = await fetch(url)
    const advising = await response.json()
    return advising.status
  } catch (err) {
    throw err
  }
}
