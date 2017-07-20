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
import { withStyles, createStyleSheet } from "material-ui/styles"

const styleSheet = createStyleSheet("TermsDialog", theme => ({
  mobileTermDiv: {
    display: "flex",
    justifyContent: "center"
  }
}))

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
    const { selectedValue, t, terms, ...other } = this.props
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
        <DialogTitle disableTypography={true}>
          <Typography type="title" tabIndex="0">
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
            selectedValue={this.state.selectedValue}
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
        </DialogContent>
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
    for (const term of this.props.terms) {
      if (Object.is(term.code, value)) {
        this.setState({
          selected: term.description,
          selectedValue: value,
          open: false
        })
      }
    }
    this.props.updateTerm(value)
  }

  render() {
    const { t } = this.props
    const classes = this.props.classes
    if (Object.is(this.props.terms, null)) {
      return <div />
    } else {
      return (
        <div className={this.props.mobile ? classes.mobileTermDiv : ""}>
          <Button
            color="accent"
            raised
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            <Typography type="button">
              {this.state.selected}
            </Typography>
          </Button>
          <ConfirmationDialog
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

export default withStyles(styleSheet)(
  translate("view", { wait: true })(TermsDialog)
)
