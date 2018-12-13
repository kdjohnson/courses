import React from 'react'
import PropTypes from 'prop-types'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Error from '@material-ui/icons/Error'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
    position: 'relative',
    width: '90%'
  },

  card: {
    backgroundColor: '#fafafa ',
    borderLeftStyle: 'solid',
    borderLeftWidth: '12px',
    borderLeftColor: '#d32f2f',
    display: 'flex'
  },

  media: {
    padding: '10px',
    display: 'flex',
    alignSelf: 'center',
    marginLeft: '10px'
  },

  content: {
    paddingTop: 0
  },

  icon: {
    fill: '#d32f2f',
    width: 75,
    height: 100
  }
})

class ErrorMessages extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardMedia className={classes.media}>
            <Error className={classes.icon} />
          </CardMedia>
          <div>
            <CardHeader title="We were unable to fetch your data at this time." />
            <CardContent className={classes.content}>
              <Typography variant="subtitle1">Please try again later.</Typography>
            </CardContent>
          </div>
        </Card>
      </div>
    )
  }
}

ErrorMessages.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: 'ErroMessages' })(ErrorMessages)
