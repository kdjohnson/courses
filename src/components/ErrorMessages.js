import React, { Component } from "react";
import Typography from "material-ui/Typography";
import Card, { CardHeader, CardContent, CardMedia } from "material-ui/Card";
import { withStyles, createStyleSheet } from "material-ui/styles";
import PropTypes from "prop-types";
import grizzHead from "../utils/grizzHead.png";

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
    borderLeftColor: "#d32f2f",
    borderRadius: "5px"
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
  }
}));
class ErrorMessages extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <div className={classes.main}>
            <CardMedia className={classes.media}>
              <img
                src={grizzHead}
                width="123.6px"
                height="95.6px"
                alt="Grizz Head Image"
                aria-hidden="true"
              />
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
        </Card>
      </div>
    );
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styleSheet)(ErrorMessages);
