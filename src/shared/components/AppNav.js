'use strict';

import React from 'react';
import Immutable from 'immutable';
import tweenState from 'react-tween-state';
import { Link } from 'react-router';
import { color, rhythm, zIndex } from '../theme';
import Button from './Button';
import SvgIcon from './SvgIcon';

import Flux from 'flummox';
let AppActions = Flux.getActions('AppActions');

const navBarRhythmHeight = 3;
const logoAspectRatio = 769.9 / 200;

let style = {
  AppNav: {
    color: color('gray'),
    height: rhythm(navBarRhythmHeight),
    lineHeight: rhythm(navBarRhythmHeight),
    position: 'relative',
    zIndex: zIndex('AppNav'),
    padding: `0 ${rhythm(1)}`,
  },

  logoIcon: {
    height: rhythm(navBarRhythmHeight * 0.5),
    width: rhythm(navBarRhythmHeight * 0.5 * logoAspectRatio), // Use aspect ratio
  },

  toggleIcon: {
    width: rhythm(navBarRhythmHeight * 0.5),
    height: rhythm(navBarRhythmHeight * 0.5),
    fill: color('gray'),
  },

  AppNavDrawer: {
    height: '100%',
    width: '100%',
    position: 'fixed',
    zIndex: zIndex('AppNav', -1),
    backgroundColor: color('gray'),
    paddingTop: rhythm(navBarRhythmHeight),
    top: 0,
    left: 0,
  }
};

let AppNav = React.createClass({

  getDefaultProps() {
    return {
      open: false,
      primaryMenu: Immutable.Map(),
    };
  },

  onToggleClick(event) {
    event.preventDefault();

    if (this.props.open) {
      AppActions.closeNav();
    } else {
      AppActions.openNav();
    }
  },

  render() {
    let primaryMenuItems = this.props.primaryMenu.get('items') || Immutable.List();

    primaryMenuItems = primaryMenuItems
      .map(item => <a href={item.get('url')} key={item.get('ID')}>{item.get('title')}</a>)
      .toJS();

    let logoIconStyle = Object.assign({
      fill: this.props.open ? color('lightGray') : color('gray'),
    }, style.logoIcon);

    return (
      <span>
        <nav className="AppNav" style={style.AppNav}>
          <div className="AppNav-bar">
            <div className="AppNav-bar-logo">
              <Button component={Link} to="/">
                <SvgIcon name="logo" style={logoIconStyle} />
              </Button>
            </div>
            <div className="AppNav-bar-content">
              {primaryMenuItems}
            </div>
            <div className="AppNav-bar-toggle">
              <Button onClick={this.onToggleClick}>
                <SvgIcon name="menu" style={style.toggleIcon} />
              </Button>
            </div>
          </div>
        </nav>
        <AppNavDrawer open={this.props.open} />
      </span>
    );
  }

});

let AppNavDrawer = React.createClass({

  mixins: [tweenState.Mixin],

  getInitialState() {
    return {
      visibility: this.props.open ? 1 : 0,
    };
  },

  getDefaultProps() {
    return {
      open: false,
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.shouldBeVisible() != this.shouldBeVisible(prevProps)) {
      this.updateVisibility();
    }
  },

  shouldBeVisible(props = this.props) {
    return props.open;
  },

  updateVisibility() {
    this.tweenState('visibility', {
      endValue: this.shouldBeVisible() ? 1 : 0,
      duration: 200,
    });
  },

  render() {
    let visibility = this.getTweeningValue('visibility');

    let _style = Object.assign({
      opacity: this.getTweeningValue('visibility'),
      display: visibility === 0 ? 'none' : 'block',
    }, style.AppNavDrawer);

    return (
      <div style={_style}>
        Menu contents
      </div>
    );
  }

});

export default AppNav;
