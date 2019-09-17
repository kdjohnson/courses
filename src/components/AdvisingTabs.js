
import React, { useState } from 'react'
import Advising from './Advising'
import AdvisingGrades from './AdvisingGrades'
import PropTypes from 'prop-types'
import TermSelect from './TermSelect'
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';

import AppBar from '@material-ui/core/AppBar'
import Assignment from '@material-ui/icons/Assignment'
import Paper from '@material-ui/core/Paper'
import Spellcheck from '@material-ui/icons/Spellcheck'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'

const TabContainer = props => (
  <div style={{ padding: 20 }}>{props.children}</div>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 0
  },

  inner: {
    marginTop: 30,
    width: '100%'
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },

  flex: {
    flex: 1
  },

  button: {
    color: '#FFFFFF'
  }
}))

const AdvisingTabs = props => {
  const { mobile } = props
  const [value, setValue] = useState(0)
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <Paper className={classes.inner}>
      <AppBar position="static">
        <Toolbar disableGutters={true} className={classes.root}>
          {mobile === true && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(_event, value) => setValue(value)}
            >
              <Tab
                aria-label={t('courses')}
                icon={
                  <Assignment
                    className={classes.button}
                    alt="View your courses for the selected term"
                  />
                }
                tabIndex="0"
              />
              <Tab
                aria-label={t('grades')}
                title="Grades"
                className={classes.tab}
                icon={
                  <Spellcheck
                    className={classes.button}
                    alt="View your grades"
                  />
                }
                tabIndex="0"
              />
            </Tabs>
          )}
          {mobile === false && (
            <Tabs
              className={classes.flex}
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab label={t('courses')} tabIndex="0" />
              <Tab label={t('grades')} tabIndex="0" />
            </Tabs>
          )}
          <TermSelect mobile={mobile} />
        </Toolbar>
      </AppBar>
      {value === 0 && (
        <TabContainer>
          <div>
            <Advising tabIndex="0" mobile={mobile} />
          </div>
        </TabContainer>
      )}
      {value === 1 && (
        <TabContainer>
          <AdvisingGrades />
        </TabContainer>
      )}
    </Paper>
  )
}

export default AdvisingTabs