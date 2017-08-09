// @flow weak
/* eslint-disable react/no-multi-comp */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"
import Paper from "material-ui/Paper"
import Tabs, { Tab } from "material-ui/Tabs"
import Courses from "./Courses"
import Grades from "./Grades"
import Calendar from "reactjs-calendar"
import { translate } from "react-i18next"
import AppBar from "material-ui/AppBar"
import Toolbar from "material-ui/Toolbar"
import TermsDialog from "./TermsDialog"
import Assignment from "material-ui-icons/Assignment"
import Event from "material-ui-icons/Event"
import Spellcheck from "material-ui-icons/Spellcheck"
import Button from "material-ui/Button"
import Typography from "material-ui/Typography"

const TabContainer = props =>
  <div style={{ padding: 20 }}>
    {props.children}
  </div>

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const styleSheet = createStyleSheet("BasicTabs", theme => ({
  root: {
    minHeight: 0
  },

  inner: {
    marginTop: 30,
    width: "100%"
  },
  appBar: {
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500])
  },

  flex: {
    flex: 1
  },

  button: {
    color: "#FFFFFF"
  }
}))

class CoursesTabs extends Component {
  state = {
    index: 0
  }

  handleChange = (event, index) => {
    this.setState({ index })
  }

  render() {
    const classes = this.props.classes
    const { t } = this.props
    return (
      <Paper className={classes.inner}>
        <AppBar position="static">
          <Toolbar disableGutters={true} className={classes.root}>
            {Object.is(this.props.mobile, true) &&
              <Tabs
                className={classes.flex}
                index={this.state.index}
                onChange={this.handleChange}
              >
                <Tab
                  aria-label={t("courses", {})}
                  title="Courses"
                  icon={
                    <Assignment
                      className={classes.button}
                      alt="View your courses for the selected term"
                    />
                  }
                  tabIndex="0"
                />
                <Tab
                  aria-label={t("calendar", {})}
                  title="Calendar"
                  icon={
                    <Event
                      className={classes.button}
                      alt="View your calendar events"
                    />
                  }
                  tabIndex="0"
                />
                <Tab
                  aria-label={t("grades", {})}
                  title="Grades"
                  icon={
                    <Spellcheck
                      className={classes.button}
                      alt="View your grades"
                    />
                  }
                  tabIndex="0"
                />
              </Tabs>}
            {Object.is(this.props.mobile, false) &&
              <Tabs
                className={classes.flex}
                index={this.state.index}
                onChange={this.handleChange}
              >
                <Tab label={t("courses", {})} tabIndex="0" />
                <Tab label={t("calendar", {})} tabIndex="0" />
                <Tab label={t("grades", {})} tabIndex="0" />
              </Tabs>}
            <TermsDialog
              terms={this.props.terms}
              currentTermDescription={this.props.currentTermDescription}
              currentTermCode={this.props.currentTermCode}
              updateTerm={this.props.updateTerm}
              mobile={this.props.mobile}
            />
          </Toolbar>
        </AppBar>
        {Object.is(this.state.index, 0) &&
          <TabContainer>
            <div>
              <Courses
                tabIndex="0"
                currentTermCode={this.props.currentTermCode}
                currentTermDescription={this.props.currentTerm.description}
                courses={this.props.courses}
                mobile={this.props.mobile}
                books={this.props.books}
              />
            </div>
          </TabContainer>}
        {Object.is(this.state.index, 1) &&
          <TabContainer>
            <Calendar
              eventsURLObj={this.props.calendarURL}
              termBounds={this.props.termBounds}
              currentTerm={this.props.currentTerm}
              rootID={this.props.rootElement}
            />
          </TabContainer>}
        {Object.is(this.state.index, 2) &&
          <TabContainer>
            <Grades
              tabIndex="0"
              courses={this.props.courses}
              mobile={this.props.mobile}
              gradesURL={this.props.gradesURL}
            />
          </TabContainer>}
      </Paper>
    )
  }
}

CoursesTabs.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styleSheet)(
  translate("view", { wait: true })(CoursesTabs)
)
