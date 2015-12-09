'use strict';

import React from 'react';
import Flux from 'flummox/component';

import PostFirstImpression from './PostFirstImpression';
import SiteContainer from './SiteContainer';
import HTMLContentArea from './HTMLContentArea';

import { nestedGet } from '../utils/ImmutableUtils';

const AboutHandler = React.createClass({
  statics: {
    routerWillRun({ flux }) {
      const PageActions = flux.getActions('pages');
      return PageActions.getPageBySlug('about');
    },

    routerDidRun({ state, flux }) {
      const NavActions = flux.getActions('nav');
      NavActions.setColor({ text: '#fff', background: 'rgba(0,0,0,0)' });
    }
  },

  render() {
    return (
      <Flux connectToStores={{
        pages: store => ({
          page: store.getPageBySlug('about')
        })
      }}>
        <AboutPage />
      </Flux>
    );
  }
});

const AboutPage = React.createClass({
  render() {
    const { page } = this.props;

    if (!page) return <span />;

    let pageTitle = nestedGet(page, 'meta', 'yoast_wpseo_title') || nestedGet(page, 'title');

    return (
      <div>
        <PostFirstImpression
          post={page}
          title="Separated, we’re raw talent."
          subtitle="Together, we’re a force."
          noMeta
        />
        <SiteContainer>
          <HTMLContentArea html={page.get('content')} />
        </SiteContainer>
      </div>
    );
  }
});

export default AboutHandler;
