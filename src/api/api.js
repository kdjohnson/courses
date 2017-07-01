export const getTerms = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/terms")
    const terms = await response.json()
    return terms.terms
  } catch (err) {
    return err
  }
}

export const getCourses = async code => {
  try {
    const response = await fetch("http://localhost:8082/api/courses", {
      body: JSON.stringify({ code: code }),
      method: "POST"
    })
    const courses = await response.json()
    return courses.courses
  } catch (err) {
    return err
  }
}

export const getCredits = async () => {
  try {
    const response = await fetch("http://localhost:8082/api/credits")
    const terms = await response.json()
    return terms.gpa
  } catch (err) {
    return err
  }
}
