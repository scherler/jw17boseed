import React from 'react';
import ReactDOM from 'react-dom';

import {
    Router,
    Route,
    IndexRedirect,
    useRouterHistory,
}
    from 'react-router';

import { createHistory } from 'history';

import '../less/index'; // tell webpack to request the transpiling of less to css

import App from './App';
import { Content } from './Content';

const root = document.getElementById('root');
const appURLBase = root && root.getAttribute && root.getAttribute('data-appurl') ? root.getAttribute('data-appurl') : '';
// Using this non-default history because it allows us to specify the base url for the app
const history = useRouterHistory(createHistory)({
    basename: appURLBase,
});

ReactDOM.render(<Router history={history}>
    <Route path="/" component={App}>
        <Route path="start" component={Content} />
        <IndexRedirect to="/start" />
    </Route>
</Router>, root);
