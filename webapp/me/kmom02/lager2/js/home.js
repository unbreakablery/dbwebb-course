/* home */

"use strict";

import {menu} from "./menu.js";

var home = {
    titleText: "Infinity Warehouses",
    description: "Where products go to disappear",

    showHome: function () {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "WebShop";

        var welcome = document.createElement("h2");

        welcome.textContent = "Welcome to our webshop!";

        var p1 = document.createElement("p");

        p1.textContent = "Order IT products safely at Scandinavia's largest IT retailer.";

        var p2 = document.createElement("p");

        p2.textContent = "Our wide range includes computer equipment, computers, tablets, " +
            "TV, HiFi, photos and mobile phones.";

        var p3 = document.createElement("p");

        p3.textContent = "Shop safely and securely here in our web shop.";

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(welcome);
        window.mainContainer.appendChild(p1);
        window.mainContainer.appendChild(p2);
        window.mainContainer.appendChild(p3);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("home");
    }
};

export {home};
