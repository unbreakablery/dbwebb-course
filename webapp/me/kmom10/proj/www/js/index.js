"use strict";

import m from 'mithril';

import { auth } from "./models/auth.js";

import { layout } from "./views/layout.js";

import { mapView } from "./views/map.js";
import { login } from "./views/login.js";
import { register } from "./views/register.js";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    m.route(document.body, "/", {
        "/": {
            onmatch: function() {
                if (auth.token) {
                    return mapView;
                } else {
                    return m.route.set("/login");
                }
            },
            render: function() {
                return m(layout, {
                    bottomNav: "#!/"
                }, m(mapView));
            }
        },
        "/login": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/login"
                }, m(login));
            }
        },
        "/register": {
            render: function() {
                return m(layout, {
                    bottomNav: "#!/login"
                }, m(register));
            }
        }
    });
}
