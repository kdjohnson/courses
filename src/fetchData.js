export const getTerms = () => {
  return fetch("http://localhost:8082/api/terms")
    .then(response => {
      return response.json()
    })
    .then(myJSON => {
      return myJSON.terms
    })
    .catch(err => {
      return err
    })
}

export const getCourses = () => {
  return fetch("http://localhost:8082/api/courses", {
    body: JSON.stringify({ code: "201610" }),
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
