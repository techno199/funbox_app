import React, { Component } from 'react'
import { withStyles, Paper, InputBase, CircularProgress } from '@material-ui/core';
import { Suggestions } from './suggestions';
import PropTypes from 'prop-types'


const styles = theme => ({
  root: {
    position: 'relative'
  },
  paper: {
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    marginLeft: theme.spacing.unit,
    flex: 1
  }
})

export class SearchBarUnstyled extends Component {
  handleSearchKeyDown = event => {
    if (event.keyCode === 13) {
      this.props.onEnter &&
      this.props.onEnter()
    }
  }

  handleSuggestionClick = item => {
    this.props.onSuggestionClick &&
    this.props.onSuggestionClick(item)
  }

  render() {
    const { classes, value, onChange, items, isFetching } = this.props
    return (
      <div className={classes.root}>
        <Paper className={classes.paper} elevation={1}>
          <InputBase 
            className={classes.input} 
            placeholder="Search Google Maps" 
            value={value} 
            onChange={onChange}
            onKeyDown={this.handleSearchKeyDown}
          />
          {
            isFetching &&
            <CircularProgress className={classes.progress} size={19}/>
          }
        </Paper>
        <Suggestions items={items} onClick={this.handleSuggestionClick}/>
      </div>
    )
  }
}

const SearchBar = withStyles(styles)(SearchBarUnstyled)

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string,
  })),
  onChange: PropTypes.func,
  isFetching: PropTypes.bool
}

export { SearchBar }
