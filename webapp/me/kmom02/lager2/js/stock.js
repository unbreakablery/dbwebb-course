/* stock */

"use strict";

import {menu} from "./menu.js";
import {productObj} from "./product.js";

var stock = {
    showStock: function () {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Stock part 1";

        window.mainContainer.appendChild(title);

        fetch("https://lager.emilfolino.se/v2/products?api_key=23369a444534d2765cdbc52396c07348")
            .then(function (response) {
                return response.json();
            }).then(function(result) {
                result.data.forEach(function(product) {
                    var prodName = document.createElement("a");
                    var prodQty = document.createElement("p");

                    prodName.textContent = product.name;
                    prodQty.textContent = `Quantity: ${product.stock}`;
                    prodName.className = "product";
                    prodQty.className = "product-quantity";

                    prodName.addEventListener("click", function() {
                        productObj.showProduct(product);
                    });
                    window.mainContainer.appendChild(prodName);
                    window.mainContainer.appendChild(prodQty);
                });

                window.rootElement.appendChild(window.mainContainer);

                menu.showMenu("storage");
            }).catch(function(error) {
                console.log('The fetch operation failed due to the following error: ',
                    error.message);
            });
    }
};

export {stock};
