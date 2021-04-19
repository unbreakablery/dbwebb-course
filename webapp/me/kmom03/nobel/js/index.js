"use strict";

import m from 'mithril';
import {layout} from './views/layout.js';
import {list} from './views/list.js';
import {year} from './views/year.js';

m.route(document.body, "/", {
    "/": {
        render: function() {
            return m(layout, m(list));
        }
    },
    "/year/:year": {
        render: function(vnode) {
            return m(layout, m(year, vnode.attrs))
        }
    }
});