'use strict';

let initialMediaState = {};

import MediaMixin from 'react-media-mixin';
MediaMixin.getInitialState = function () {
  return { media: initialMediaState };
};

import React from 'react';
import Router from 'react-router';
import routes from '../../../shared/routes';
import prepareForRun from '../../../shared/prepareForRun';

import userAgentToMediaState from '../../userAgentToMediaState';

export default function(app) {
  app.get(/.*/, function *() {

    // Use useragent to override react-media-mixin's initial state
    initialMediaState = userAgentToMediaState(this.headers['user-agent']);

    let { Handler, state } = yield new Promise((resolve, reject) => {
      Router.run(routes, this.path, (Handler, state) => resolve({ Handler, state }));
    });

    yield prepareForRun(state);

    let appString = React.renderToString(<Handler />);

    yield this.render('app', {
      appString,
      env: process.env,
    });

    initialMediaState = {};
  });
}
