import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd';
import { withStyles, ListItem, Button, Typography } from '@material-ui/core';
import classNames from 'classnames'
import ClearIcon from '@material-ui/icons/Clear';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

const styles = theme => ({
  listItem: {
    display: 'flex'
  },
  hidden: {
    opacity: 0
  },
  listItemValue: {
    flexGrow: 1
  },
  xMark: {
    minWidth: 0
  }
})

const listItemSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const listItemTarget = {
  hover(props, monitor, component) {
    if (!component) return

    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    // Don't replace items with themselves
    if (dragIndex === hoverIndex) return
    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
    // Get vertical middle 
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
    // Determine mouse position
    const clientOffset = monitor.getClientOffset()
    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top
    // Dragging upwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
    //Dragging downwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

    props.moveListItem(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

export class PointListItemUnstyled extends Component {
  onRemoveClick = () => {
    this.props.onRemoveClick &&
    this.props.onRemoveClick()
  }

  render() {
    const { isDragging, classes, text, connectDragSource, connectDropTarget } = this.props
    return (
      connectDragSource(
        connectDropTarget(
          <div>
            <ListItem
              className={classNames(classes.listItem, { [classes.hidden]: isDragging })}
            >
              <Typography className={classes.listItemValue}>
                {text}
              </Typography>
              <Button onClick={this.onRemoveClick} className={classes.xMark}>
                <ClearIcon />
              </Button>
            </ListItem>
          </div>
        )
      )
    )
  }
}

const PointListItem = DropTarget('LIST_ITEM', listItemTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(
  DragSource('LIST_ITEM', listItemSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }))(withStyles(styles)(PointListItemUnstyled)),
)

PointListItem.propTypes = {
  text: PropTypes.string.isRequired
}

export { PointListItem }