'use strict';

import Flummox from 'flummox2';

import PostActions from './actions/PostActions';
import PostStore from './stores/PostStore';

import PageActions from './actions/PageActions';
import PageStore from './stores/PageStore';

import AppActions from './actions/AppActions';
import AppStore from './stores/AppStore';

import RouterActions from './actions/RouterActions';
import RouterStore from './stores/RouterStore';

export default class Flux extends Flummox {

  constructor() {
    super();

    this.createActions('posts', PostActions);
    this.createStore('posts', PostStore, this);

    this.createActions('pages', PageActions);
    this.createStore('pages', PageStore, this);

    this.createActions('app', AppActions);
    this.createStore('app', AppStore, this);

    this.createActions('router', RouterActions);
    this.createStore('router', RouterStore, this);
  }

}