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
    console.log("getCourses")
    console.log(code)
    const response = await fetch("http://localhost:8082/api/courses", {
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

/*
export const getCourses = code => {
  console.log("getCourses")
  console.log(code)
  return fetch("http://localhost:8082/api/courses", {
    body: JSON.stringify({ code: code }),
    method: "POST"
  })
    .then(response => {
      return response.json()
    })
    .then(myJSON => {
      return myJSON.courses
    })
    .catch(err => {
      return err
    })
}
*/
