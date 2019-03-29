import React, { Component } from 'react';
import './App.css';
import { withStyles, Grid} from '@material-ui/core';
import { InteractiveMap } from './components/interactiveMap';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 2,
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing.unit * 10
    }
  }
});

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <Grid container justify='center' className={classes.root}>
        <Grid item xs={11} md={10}>
          <InteractiveMap />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
