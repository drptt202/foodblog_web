import React, {Component} from 'react';
import store from './common/store';
import historyCommon from './common/historyCommon';
import {Provider} from 'react-redux';
import {ConnectedRouter} from "connected-react-router";
import AllRoutes from './routes'
import moment from "moment";

import 'antd/dist/antd.less';
import './styles/index.scss';

// Set moment config
moment.updateLocale('en', {
    week: {
        dow : 1, // Monday is the first day of the week.
    }
});

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <ConnectedRouter history={historyCommon}>
              <AllRoutes/>
          </ConnectedRouter>
        </Provider>
    );
  }
}

export default App
