import React, { Component } from "react"
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { getCredits } from "./fetchData"
import PropTypes from "prop-types"

const styleSheet = createStyleSheet("Grades", theme => ({
  cardDiv: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  card: {
    backgroundColor: "#fafafa"
  },

  courseTitle: {
    fontSize: 16,
    color: theme.palette.text.primary
  },

  classHeader: {
    backgroundColor: theme.palette.primary[400]
  },

  classHeaderSpan: {
    fontWeight: 600,
    color: "rgba(0, 0, 0, 0.75)"
  },

  content: {
    paddingTop: 0
  },
  tableHeader: {
    color: "rgba(0, 0, 0, 1)",
    fontWeight: 600,
    fontSize: 14
  },
  tableCell: {
    width: "33%"
  }
}))

class Grades extends Component {
  state = {
    creditsObj: null
  }

  componentDidMount() {
    getCredits().then(credits => {
      this.setState({ creditsObj: credits })
    })
  }

  render() {
    const classes = this.props.classes
    if (
      this.props.courses == null ||
      this.props.courses == undefined ||
      this.state.creditsObj == null ||
      this.state.creditsObj == undefined
    ) {
      return <div />
    }
    return (
      <Card className={classes.card}>
        <CardHeader
          className={classes.classHeader}
          title={
            <Typography
              tabIndex="0"
              component="h1"
              className={classes.classHeaderSpan}
              style={{ fontSize: "20px" }}
            >
              Grades and Credits
            </Typography>
          }
        />
        <CardContent className={classes.content}>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell className={classes.tableCell} scope="col">
                  Level
                </TableCell>
                <TableCell className={classes.tableCell} scope="col">
                  Credits
                </TableCell>
                <TableCell className={classes.tableCell} scope="col">
                  GPA
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{this.state.creditsObj[0].level}</TableCell>
                <TableCell>{this.state.creditsObj[0].credits}</TableCell>
                <TableCell>{this.state.creditsObj[0].gpa}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHead>
              <TableRow className={classes.tableHeader}>
                <TableCell className={classes.tableCell} scope="col">
                  Course
                </TableCell>
                <TableCell className={classes.tableCell} scope="col">
                  Credits
                </TableCell>
                <TableCell className={classes.tableCell} scope="col">
                  Grades
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {GradeRow(this.props.courses)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
}

const GradeRow = obj => {
  if (Object.is(null, obj) || Object.is(undefined, obj)) {
    return <TableRow />
  }
  let tableArray = []
  for (let i = 0; i < obj.length; i++) {
    let course = obj[i].departmentCode + " - " + obj[i].subjectNumber
    let credits = obj[i].grade.credit
    let grade = obj[i].grade.grade

    tableArray.push(
      <TableRow>
        <TableCell>{course}</TableCell>
        <TableCell>{credits}</TableCell>
        <TableCell>{grade}</TableCell>
      </TableRow>
    )
  }
  return tableArray
}

Grades.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(Grades)
