import React, { Component } from 'react'
import { withStyles, List, Grid } from '@material-ui/core';
import { PointListItem } from './listItem';
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: 200
  },
  emptyRoot: {
    minHeight: 200,
    backgroundColor: theme.palette.background.paper,
  },
  hidden: {
    opacity: 0.5
  }
})

export class PointListUnstyled extends Component {
  render() {
    const { classes, items, onRemoveClick, moveListItem } = this.props

    return (
          items.length > 0 ? (
          <List className={classes.root}>
            {items.map((item, i) =>
              <PointListItem 
                key={item.id}   
                id={item.id} 
                index={i} 
                text={item.value} 
                onRemoveClick={onRemoveClick(item.id)} 
                moveListItem={moveListItem}/>
              )}
          </List>
          ) :
          <Grid container justify='center' alignItems='center' className={classes.emptyRoot}> 
            <Grid item>
              No items selected
            </Grid>
          </Grid>
    )
  }
}

const PointList = withStyles(styles)(PointListUnstyled)

PointList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.string
  })),
  onRemoveClick: PropTypes.func,
  moveListItem: PropTypes.func,
}

export { PointList }
