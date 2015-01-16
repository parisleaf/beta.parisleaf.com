'use strict';

import Flux from 'flummox';

let AppConstants = Flux.getConstants('AppConstants');

Flux.createActions({

  name: 'AppActions',

  openNav() {
    this.dispatchAction(AppConstants.APP_NAV_OPEN);
  },

  closeNav() {
    this.dispatchAction(AppConstants.APP_NAV_CLOSE);
  },

  setNavTextColor(color) {
    this.dispatchAction(AppConstants.APP_NAV_SET_TEXT_COLOR, color);
  },

});