// @flow weak

import React, { Component } from "react"
import Button from "material-ui/Button"
import Menu, { MenuItem } from "material-ui/Menu"
import PropTypes from "prop-types"
import { withStyles, createStyleSheet } from "material-ui/styles"

const styleSheet = createStyleSheet("TermsMenu", theme => ({
  mobileTermDiv: {
    display: "flex",
    justifyContent: "center"
  }
}))

class TermsMenu extends Component {
  componentDidMount() {
    this.setState({
      selected: this.props.currentTermDescription
    })
  }

  state = {
    anchorEl: undefined,
    open: false,
    selected: ""
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleSelect = (selected, code) => {
    this.setState({ selected, open: false })
    this.props.updateTerm(code)
  }

  getTerms = () => {
    let elements = []
    for (let i = 0, total = this.props.terms.length; i < total; i++) {
      elements.push(
        <MenuItem
          key={this.props.terms[i].code + Math.random()}
          onClick={() =>
            this.handleSelect(
              this.props.terms[i].description,
              this.props.terms[i].code
            )}
        >
          {this.props.terms[i].description}
        </MenuItem>
      )
    }
    return elements
  }

  render() {
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
            {this.state.selected}
          </Button>
          <Menu
            id="terms-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {this.getTerms()}
          </Menu>
        </div>
      )
    }
  }
}

export default withStyles(styleSheet)(TermsMenu)
