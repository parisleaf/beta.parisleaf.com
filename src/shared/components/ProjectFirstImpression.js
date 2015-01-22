'use strict';

import React from 'react';
import ViewportContainer from 'react-viewport';
import SiteContainer from './SiteContainer';
import Header from './Header';
import { nestedGet } from '../utils/ImmutableUtils';
import { color, rhythm, navBarRhythmHeight } from '../theme';

let style = {
  _: {
    height: '100vh',
    marginTop: rhythm(-1 * navBarRhythmHeight),
  },

  hero: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: '#fff',
  },

  heroContent: {
    width: '100%',
  },

  footer: {
    padding: `${rhythm(1)} 0`,
    textAlign: 'center',
  },
};

let ProjectFirstImpression = React.createClass({

  render() {
    let { project } = this.props;

    let projectMeta = nestedGet(project, 'meta');
    let heroImageUrl = nestedGet(projectMeta, 'hero_image', 'sizes', 'large')
      || nestedGet(projectMeta, 'hero_image', 'url');

    let heroStyle = Object.assign({
      backgroundImage: `url(${heroImageUrl})`,
    }, style.hero);

    let heroHeaderContainerStyle = {
      borderLeftColor: color('pink'),
    };

    return (
      <ViewportContainer style={style._} className="ProjectFirstImpression">
        <div style={heroStyle} className="ProjectFirstImpression-hero">
          <SiteContainer style={style.heroContent}>
            <header className="BorderContainer" style={heroHeaderContainerStyle}>
              <Header level={1}>{project.get('title')}</Header>
              <Header level={2}>{nestedGet(projectMeta, 'tagline')}</Header>
            </header>
          </SiteContainer>
        </div>
        <div style={style.footer} className="ProjectFirstImpression-footer">
          <SiteContainer>
            asldkfjasldf
          </SiteContainer>
        </div>
      </ViewportContainer>
    );
  },

});

export default ProjectFirstImpression;