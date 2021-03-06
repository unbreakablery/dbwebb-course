/* global menu */

"use strict";

var product = (function () {
    var showProduct = function (p) {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("a");

        // title.className = "title";
        title.textContent = "Stock";
        title.className = "product";
        title.addEventListener("click", function() {
            window.stock.showStock();
        });
        window.mainContainer.appendChild(title);

        var prodTitle = document.createElement("h2");
        prodTitle.textContent = p.name;

        var prodDesc = document.createElement("p");
        prodDesc.textContent = p.description;

        window.mainContainer.appendChild(prodTitle);
        window.mainContainer.appendChild(prodDesc);
    };

    return {
        showProduct: showProduct
    };
})(product);