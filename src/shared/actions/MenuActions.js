'use strict';

import Flux from 'flummox';
import APIService from '../services/APIService';

let MenuConstants = Flux.getConstants('MenuConstants');

Flux.createActions({

  name: 'MenuActions',

  serviceActions: {
    getMenus: [MenuConstants.MENU_GET_MENUS, function(...args) {
      return APIService.getMenus(...args);
    }],

    getMenuBySlug: [MenuConstants.MENU_GET_MENU_BY_SLUG, function(...args) {
      return APIService.getMenuBySlug(...args);
    }],
  },

});
