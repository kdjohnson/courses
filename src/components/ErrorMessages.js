import React, { Component } from "react"
import Typography from "material-ui/Typography"
import Card, {
  CardHeader,
  CardContent,
  CardMedia,
  CardActions
} from "material-ui/Card"
import { withStyles, createStyleSheet } from "material-ui/styles"
import PropTypes from "prop-types"
import grizzHead from "../img/grizzHead.png"
import Error from "material-ui-icons/Error"
import Button from "material-ui/Button"

const styleSheet = createStyleSheet("ErrorMessages", theme => ({
  root: {
    position: "relative",
    maxWidth: "650px",
    textAlign: "ltr"
  },

  card: {
    backgroundColor: "#fafafa ",
    borderLeftStyle: "solid",
    borderLeftWidth: "12px",
    borderLeftColor: "#d32f2f"
  },

  media: {
    padding: "10px",
    display: "flex",
    alignSelf: "center",
    marginLeft: "10px"
  },

  main: {
    display: "flex",
    flexDirection: "row"
  },

  head: {
    display: "flex",
    flexFlow: "column wrap"
  },

  content: {
    paddingTop: 0
  },

  icon: {
    fill: "#d32f2f",
    width: 75,
    height: 100
  }
}))

class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.main}>
            <CardMedia className={classes.media}>
              <Error className={classes.icon} />
            </CardMedia>
            <div className={classes.head}>
              <CardHeader title="We were unable to fetch data at this time" />
              <CardContent className={classes.content}>
                <Typography type="subheading">
                  Please try again later
                </Typography>
              </CardContent>
            </div>
          </div>
          <CardActions>
            <Button
              color="accent"
              href="https://wwwp.oakland.edu/registrar/important-dates/#tab-4"
              target="_blank"
            >
              Final Exam Dates
            </Button>
            <Button
              color="accent"
              href="https://wwwp.oakland.edu/gpa-calculator/"
              target="_blank"
            >
              GPA Calculator
            </Button>
            <Button
              color="accent"
              href="https://wwwp.oakland.edu/oira/distribution-of-grades/"
              target="_blank"
            >
              Grade Distributions
            </Button>
            <Button
              color="accent"
              href="https://sail.oakland.edu/PROD/bwskotrn.P_ViewTermTran"
              target="_blank"
            >
              View Transcript
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(ErrorMessages)
