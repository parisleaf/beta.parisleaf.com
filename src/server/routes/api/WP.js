'use strict';

import WP from 'wordpress-rest-api';
import request from 'superagent';

/**
 * wordpress-rest-api interface to WP-API
 */
let wp;
if (process.env.NODE_ENV !== 'test') {
  wp = new WP({
    endpoint: process.env.WP_ENDPOINT,
    username: process.env.WP_USER,
    password: process.env.WP_PASSWORD,
  });
} else {
  wp = new WP({
    endpoint: process.env.WP_ENDPOINT,
  });
}

export default wp;

/**
 * Superagent interface to WP-API. Use for endpoints that aren't supported yet
 * by wordpress-rest-api, such as menus.
 * @param {path} Path to endpoint
 * @returns {Promise} Resolves to superagent response
 */

async function wpRequest(path) {
  let r = request.get(process.env.WP_ENDPOINT + ensureLeadingSlash(path));

  if (process.env.NODE_ENV !== 'test') {
    r = r.auth(process.env.WP_USER, process.env.WP_PASSWORD);
  }

  return await r.exec();
}

export { wpRequest };

/**
 * Ensure that a url has a leading slash.
 * @param {[type]} url [description]
 */
function ensureLeadingSlash(url) {
  return '/' + url.replace(/^\//g, '');
}
