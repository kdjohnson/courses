import React, { Component } from "react"

class Grades extends Component {
  render() {
    console.log(this.props.courses)
    if (this.props.courses == null || this.props.courses == undefined) {
      return <div />
    }
    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Credits</th>
            <th scope="col">Grades</th>
          </tr>
        </thead>
        <tbody>
          {GradeRow(this.props.courses)}
        </tbody>
      </table>
    )
  }
}

const GradeRow = obj => {
  console.log(obj)
  if (Object.is(null, obj) || Object.is(undefined, obj)) {
    return <tr />
  }
  let tableArray = []
  for (let i = 0; i < obj.length; i++) {
    let course = obj[i].departmentCode + " - " + obj[i].subjectNumber
    let credits = obj[i].grade.credit
    let grade = obj[i].grade.grade

    tableArray.push(
      <tr>
        <td>{course}</td>
        <td>{credits}</td>
        <td>{grade}</td>
      </tr>
    )
  }
  return tableArray
}

export default Grades
