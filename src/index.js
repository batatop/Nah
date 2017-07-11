import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal600} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Boento from './components';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: teal600
    },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Boento />
  </MuiThemeProvider>
);

ReactDOM.render(
    <App />, document.getElementById('root')
);
