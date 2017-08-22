// @flow weak

import React, { Component } from "react"
import Button from "material-ui/Button"
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from "material-ui/Dialog"
import Radio, { RadioGroup } from "material-ui/Radio"
import { FormControlLabel } from "material-ui/Form"
import Slide from "material-ui/transitions/Slide"
import Typography from "material-ui/Typography"
import PropTypes from "prop-types"
import { translate } from "react-i18next"
import { withStyles } from "material-ui/styles"

const styles = theme => ({
  text: {
    color: "#FFFFFF"
  },

  button: {
    marginRight: "1em",
    color: "#FFFFFF"
  },

  header: {
    backgroundColor: theme.palette.primary[400]
  },

  title: {
    fontWeight: 600
  }
})

class ConfirmationDialog extends Component {
  state = {
    selectedValue: undefined
  }

  componentWillMount() {
    this.setState({ selectedValue: this.props.selectedValue })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.selectedValue !== this.props.selectedValue) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({ selectedValue: nextProps.selectedValue })
    }
  }

  radioGroup = null

  handleEntering = () => {
    this.radioGroup.focus()
  }

  handleCancel = () => {
    this.props.onRequestClose(this.props.selectedValue)
  }

  handleOk = () => {
    this.props.onRequestClose(this.state.selectedValue)
  }

  handleChange = (event, value) => {
    this.setState({ selectedValue: value })
  }

  render() {
    const { selectedValue, t, terms, classes, ...other } = this.props
    return (
      <Dialog
        role="dialog"
        id="dialogbox"
        aria-label="course description"
        tabIndex="0"
        open={this.props.open}
        onRequestClose={this.handleClose}
        transition={<Slide direction="down" />}
        ignoreBackdropClick
        ignoreEscapeKeyUp
        maxWidth="xs"
        onEntering={this.handleEntering}
        {...other}
      >
        <DialogTitle
          disableTypography={true}
          className={this.props.classes.header}
        >
          <Typography
            type="title"
            tabIndex="0"
            className={this.props.classes.title}
          >
            Terms
          </Typography>
        </DialogTitle>
        <DialogContent aria-labelledby="dialogbox">
          <RadioGroup
            innerRef={node => {
              this.radioGroup = node
            }}
            aria-label="terms"
            name="terms"
            value={this.state.selectedValue}
            onChange={this.handleChange}
          >
            {this.props.terms.map(term =>
              <FormControlLabel
                value={term.code}
                key={term.code}
                control={<Radio />}
                label={term.description}
              />
            )}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleOk}
            aria-label={"Confirm selection"}
            tabIndex="0"
            color="accent"
          >
            {this.props.t("ok", {})}
          </Button>
          <Button
            onClick={this.handleCancel}
            aria-label="Cancel selection"
            tabIndex="0"
            color="accent"
          >
            {this.props.t("cancel", {})}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

ConfirmationDialog.propTypes = {
  onRequestClose: PropTypes.func,
  selectedValue: PropTypes.string
}

class TermsDialog extends Component {
  componentDidMount() {
    this.setState({
      selected: this.props.currentTermDescription,
      selectedValue: this.props.currentTermCode
    })
  }
  state = {
    selected: this.props.currentTermDescription,
    selectedValue: this.props.currentTermCode,
    open: false
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleClick = event => {
    this.setState({ open: true })
  }

  button = undefined

  handleRequestClose = value => {
    let newTerm = null
    for (const term of this.props.terms) {
      if (Object.is(term.code, value)) {
        this.setState({
          selected: term.description,
          selectedValue: value,
          open: false
        })
        newTerm = term
      }
    }
    this.props.updateTerm(newTerm)
  }

  render() {
    const { t } = this.props
    const classes = this.props.classes
    if (Object.is(this.props.terms, null)) {
      return <div />
    } else {
      return (
        <div>
          <Button
            className={classes.button}
            tabIndex="0"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Typography className={classes.text}>terms</Typography>
          </Button>
          <ConfirmationDialog
            classes={classes}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
            selectedValue={this.state.selectedValue}
            terms={this.props.terms}
            t={t}
          />
        </div>
      )
    }
  }
}

TermsDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { name: "TermsDialog" })(
  translate("view", { wait: true })(TermsDialog)
)
