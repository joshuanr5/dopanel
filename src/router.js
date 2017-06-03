import React from 'react';
import { Router } from 'dva/router';

import App from './routes/App';

const cached = {};
function registerModel(app, model) {
  if (!cached[model.namespace]) {
    app.model(model);
    cached[model.namespace] = true;
  }
}

export default ({ history, app }) => {
  const routes = [
    {
      path: '/',
      component: App,
      getIndexRoute(nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/dopanel'));
          cb(null, { component: require('./routes/company') });
        }, 'dopanel');
      },
      childRoutes: [
        {
          path: 'business',
          name: 'business',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/dopanel'));
              cb(null, require('./routes/company'));
            }, 'business');
          },
        },
        {
          path: 'customers',
          name: 'customers',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/customers'));
              cb(null, require('./routes/customers'));
            }, 'customers');
          },
        },
        {
          path: '*',
          name: 'error',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error'));
            }, 'error');
          },
        },
      ],
    },
  ];
  return (
    <Router history={history} routes={routes} />
  );
}
