export const getTerms = async () => {
  try {
    const response = await fetch("http://141.210.186.165:8082/api/terms")
    const terms = await response.json()
    return terms.terms
  } catch (err) {
    return err
  }
}

export const getCourses = async code => {
  try {
    const response = await fetch("http://141.210.186.165:8082/api/courses", {
      body: JSON.stringify({ code: code }),
      method: "POST"
    })
    const courses = await response.json()
    return courses.courses
  } catch (err) {
    console.error(err)
    return err
  }
}
