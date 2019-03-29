import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { DragDropContextProvider } from 'react-dnd';
import html5backend from 'react-dnd-html5-backend'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#eeeeee'
    }
  },
  typography: {
    useNextVariants: true
  }
})

ReactDOM.render(
  <React.Fragment>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DragDropContextProvider backend={html5backend}>
        <App />
      </DragDropContextProvider> 
    </MuiThemeProvider>
  </React.Fragment>, 
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
