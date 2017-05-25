// @flow weak

import React, { Component } from "react"
import Button from "material-ui/Button"
import Menu, { MenuItem } from "material-ui/Menu"
import { getTerms } from "./fetchData"

class SimpleMenu extends Component {
  componentWillMount() {
    getTerms()
      .then(terms => {
        console.log(terms)
        this.setState({ terms })
      })
      .then(() => {
        this.state.terms.map(term => {
          if (Object.is(term.current, "true")) {
            this.setState({ selected: term.description })
          }
        })
      })
  }

  state = {
    anchorEl: undefined,
    open: false,
    selected: "",
    terms: []
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleSelect = selected => {
    this.setState({ selected, open: false })
  }

  getTerms = () => {
    let elements = []
    this.state.terms.map(term =>
      elements.push(
        <MenuItem
          key={term.code}
          onClick={() => this.handleSelect(term.description)}
        >
          {term.description}
        </MenuItem>
      )
    )

    return elements
  }

  render() {
    if (Object.is(this.state.terms, null)) {
      return <div />
    } else {
      return (
        <div style={{ marginTop: "2em" }}>
          <Button
            aria-owns="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {this.state.selected}
          </Button>
          <Menu
            id="simple-menu"
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

export default SimpleMenu
