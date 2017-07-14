import React, { Component } from "react"
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "material-ui/Table"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Card, { CardHeader, CardContent } from "material-ui/Card"
import Typography from "material-ui/Typography"
import { getCredits } from "./../api/api"
import PropTypes from "prop-types"
import { translate } from "react-i18next"

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
    paddingTop: 0,
    overflowX: "scroll"
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
    const { t } = this.props
    try {
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
                {t("gac", {})}
              </Typography>
            }
          />
          <CardContent className={this.props.mobile ? classes.content : null}>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    {t("level", {})}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t("credits", {})}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    GPA
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    {this.state.creditsObj[0].level}
                  </TableCell>
                  <TableCell>
                    {this.state.creditsObj[0].credits}
                  </TableCell>
                  <TableCell>
                    {this.state.creditsObj[0].gpa}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Table>
              <TableHead>
                <TableRow className={classes.tableHeader}>
                  <TableCell className={classes.tableCell} scope="col">
                    {t("course", {})}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t("credits", {})}
                  </TableCell>
                  <TableCell className={classes.tableCell} scope="col">
                    {t("grades", {})}
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
    } catch (error) {
      return <div />
    }
  }
}

const GradeRow = courses => {
  try {
    let tableArray = []
    for (let i = 0; i < courses.length; i++) {
      let course = courses[i].departmentCode + " - " + courses[i].subjectNumber
      let credits = courses[i].grade.credit
      let grade = courses[i].grade.grade

      tableArray.push(
        <TableRow key={i + Math.random()}>
          <TableCell>
            {course}
          </TableCell>
          <TableCell>
            {credits}
          </TableCell>
          <TableCell>
            {grade}
          </TableCell>
        </TableRow>
      )
    }
    return tableArray
  } catch (error) {
    return <TableRow />
  }
}

Grades.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(translate("view", { wait: true })(Grades))
