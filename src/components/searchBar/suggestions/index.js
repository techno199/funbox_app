import React, { Component } from 'react'
import { withStyles, List, ListItem, Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    position: 'absolute',
    zIndex: 1000,
    marginTop: theme.spacing.unit,
    width: '100%'
  }
})

class SuggestionsUnstyled extends Component {
  handleClick = item => event => {
    this.props.onClick &&
    this.props.onClick(item)
  }

  handleBlur = event => {
    console.log('onBlur fired')
  }

  render() {
    const { classes, items } = this.props
    let normalizedItems = items || []
    return (
      <Paper elevation={1} className={classes.root} hidden={!normalizedItems.length}>
        <List>
          {
            normalizedItems.map((item, i) => (
              <ListItem button key={i} onClick={this.handleClick(item)}>
                <Typography>
                  {item.description}
                </Typography>
              </ListItem>
            ))
          }
        </List>
      </Paper>
    )
  }
}

const Suggestions = withStyles(styles)(SuggestionsUnstyled)

Suggestions.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired
  })),
  onClick: PropTypes.func
}

export { Suggestions }