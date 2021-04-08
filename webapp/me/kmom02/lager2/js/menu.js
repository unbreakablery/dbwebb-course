/*global menu*/

"use strict";

import {home} from "./home.js";
import {stock} from "./stock.js";
import {orders} from "./orders.js";

var menu = {
    showMenu: function (selected) {
        window.navigation.innerHTML = "";

        var navElements = [
            {name: "Home", class: "home", nav: home.showHome},
            {name: "Stock", class: "storage", nav: stock.showStock},
            {name: "Orders", class: "orders", nav: orders.showList}
        ];

        navElements.forEach(function (element) {
            var navElement = document.createElement("a");

            if (selected === element.class) {
                navElement.className = "active";
            }

            navElement.addEventListener("click", element.nav);

            // var icon = document.createElement("i");

            // icon.className = "material-icons";
            // icon.textContent = element.class;
            // navElement.appendChild(icon);

            // var text = document.createElement("span");

            // text.className = "icon-text";
            // text.textContent = element.name;
            // navElement.appendChild(text);

            navElement.textContent = element.name;

            window.navigation.appendChild(navElement);
        });

        window.rootElement.appendChild(window.navigation);
    }
};

export {menu};
