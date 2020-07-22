/* global token */

export const get_courses = async (term, url) => {
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