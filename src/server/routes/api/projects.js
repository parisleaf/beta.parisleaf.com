'use strict';

import wp from './WP';
import whitelist from '101/pick';

const acceptedProjectFilters = [];

export default function(app) {

  app.get('/api/projects', function *() {
    this.set('Cache-Control', 'max-age=86400');
    this.set('Vary', 'Accept-Encoding');

    let filter = whitelist(this.query, acceptedProjectFilters);
    let projects = yield wp.posts()
      .type('project')
      .filter({
        filter,
        nopaging      : true,
        posts_per_page: 100,
      })
      .get();
    this.body = projects;
  });

  app.get('/api/projects/:slug', function *() {
    this.set('Cache-Control', 'max-age=86400');
    this.set('Vary', 'Accept-Encoding');

    this.body = yield wp.projects().slug(this.params.slug).get();
  });

}
