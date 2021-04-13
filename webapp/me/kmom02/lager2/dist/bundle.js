/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/home.js":
/*!********************!*\
  !*** ./js/home.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "home": () => (/* binding */ home)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");
/* home */





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

        _menu_js__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("home");
    }
};




/***/ }),

/***/ "./js/menu.js":
/*!********************!*\
  !*** ./js/menu.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menu": () => (/* binding */ menu)
/* harmony export */ });
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");
/* harmony import */ var _stock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stock.js */ "./js/stock.js");
/* harmony import */ var _orders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orders.js */ "./js/orders.js");
/*global menu*/







var menu = {
    showMenu: function (selected) {
        window.navigation.innerHTML = "";

        var navElements = [
            {name: "Home", class: "home", nav: _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome},
            {name: "Stock", class: "storage", nav: _stock_js__WEBPACK_IMPORTED_MODULE_1__.stock.showStock},
            {name: "Orders", class: "orders", nav: _orders_js__WEBPACK_IMPORTED_MODULE_2__.orders.showList}
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




/***/ }),

/***/ "./js/order_details.js":
/*!*****************************!*\
  !*** ./js/order_details.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orderDetails": () => (/* binding */ orderDetails)
/* harmony export */ });
/* harmony import */ var _orders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./orders.js */ "./js/orders.js");
/* Order Detail */





// const api_key= "8343d9b29b9a221a4755bf7f0e3cf776";
const api_key= "23369a444534d2765cdbc52396c07348";

var orderDetails = {
    showOrder: function (order) {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("a");
        title.textContent = "Orders";
        title.className = "";
        title.addEventListener("click", function() {
            _orders_js__WEBPACK_IMPORTED_MODULE_0__.orders.showList();
        });
        window.mainContainer.appendChild(title);

        var orderID = document.createElement("h2");
        var customerName = document.createElement("p");
        var customerAddress = document.createElement("p");
        var orderStatus = document.createElement("p");

        orderID.textContent = `Order ID: ${order.id}`;
        customerName.textContent = `Customer Name: ${order.name}`;
        customerAddress.textContent = `Address: ${order.address}, ${order.zip}, `;
        customerAddress.textContent += `${order.city}, ${order.country}`;
        orderStatus.innerHTML = `Status: <span class="status status-${order.status.toLowerCase()}">${order.status}</span>`;

        var orderItems = document.createElement("table");
        var tHeader = document.createElement("thead");
        var tBody = document.createElement("tbody");
        var tHeaderHtml = "";
        var tBodyHtml = "";
        tHeaderHtml = "<tr>";
        tHeaderHtml += "<th>Product Name</th>";
        tHeaderHtml += "<th>Price</th>";
        tHeaderHtml += "<th>Amount</th>";
        tHeaderHtml += "<th>Location</th>";
        tHeaderHtml += "<th>In Stock</th>";
        tHeaderHtml += "</tr>";
        tHeader.innerHTML = tHeaderHtml;

        var packAvailable = true;
        order.order_items.forEach(product => {
            packAvailable = (product.amount > product.stock) ? false : packAvailable;
            var prodHtml = "";
            prodHtml += (product.amount > product.stock) ? "<tr class='unpackable'>" : "<tr>";
            prodHtml += `<td data-title='Product Name'>${product.name}</td>`;
            prodHtml += `<td data-title='Price' class='number-cell'>${product.price}</td>`;
            prodHtml += `<td data-title='Amount' class='number-cell'>${product.amount}</td>`;
            prodHtml += `<td data-title='Location'>${product.location}</td>`;
            prodHtml += `<td data-title='In Stock' class='number-cell'>${product.stock}</td>`;
            prodHtml += "</tr>";
            tBodyHtml += prodHtml;
        });

        orderItems.className = "table table-stacked table-striped";
        tBody.innerHTML = tBodyHtml;
        orderItems.appendChild(tHeader);
        orderItems.appendChild(tBody);

        window.mainContainer.appendChild(orderID);
        window.mainContainer.appendChild(customerName);
        window.mainContainer.appendChild(customerAddress);
        window.mainContainer.appendChild(orderStatus);
        window.mainContainer.appendChild(orderItems);

        if (order.status_id == 100 && packAvailable) {
            var packButton = document.createElement("button");
            packButton.textContent = "Pack";
            packButton.className = "button green-button push-t-1";
            packButton.id = "pack-button";
            packButton.addEventListener("click", function() {
                var o_data = {
                    id: order.id,
                    status_id: 200,
                    api_key: api_key
                };
                
                fetch("https://lager.emilfolino.se/v2/orders", {
                    body: JSON.stringify(o_data),
                    headers: {
                      'content-type': 'application/json'
                    },
                    method: 'PUT'
                })
                .then(function (response) {
                    //update stock balance
                    order.order_items.forEach(product => {
                        var p_data = {
                            id: product.product_id,
                            name: product.name,
                            stock: product.stock - product.amount,
                            api_key: api_key
                        };
                        fetch("https://lager.emilfolino.se/v2/products", {
                            body: JSON.stringify(p_data),
                            headers: {
                            'content-type': 'application/json'
                            },
                            method: 'PUT'
                        })
                        .then(function (response) {
                            console.log(product.name + `-> stock balance was reduced (${product.amount})`);
                        });
                    });

                    var notification = document.createElement("p");
                    if (response.ok) {
                        notification.textContent = "Order was packed successfully!";
                        notification.className = "text-success push-t-1";
                    } else {
                        notification.textContent = "Error occurs while processing!";
                        notification.className = "text-danger push-t-1";
                    }
                    
                    document.querySelector("#pack-button").remove();
                    window.mainContainer.appendChild(notification);
                });
            });
            window.mainContainer.appendChild(packButton);
        } else {
            var notification = document.createElement("p");
            notification.textContent = "You can't pack this order ";
            notification.textContent += "because already packed or not enough projects.";
            notification.className = "unpackable push-t-1";
            window.mainContainer.appendChild(notification);
        }
    }
};




/***/ }),

/***/ "./js/orders.js":
/*!**********************!*\
  !*** ./js/orders.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "orders": () => (/* binding */ orders)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");
/* harmony import */ var _order_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./order_details.js */ "./js/order_details.js");
/* Orders */






var orders = {
    showList: function () {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Order List";

        window.mainContainer.appendChild(title);

        fetch("https://lager.emilfolino.se/v2/orders?api_key=23369a444534d2765cdbc52396c07348")
        // fetch("https://lager.emilfolino.se/v2/orders?api_key=8343d9b29b9a221a4755bf7f0e3cf776")
            .then(function (response) {
                return response.json();
            }).then(function(result) {
                result.data.forEach(function(order) {
                    var orderID = document.createElement("a");
                    var customerName = document.createElement("p");
                    var customerAddress = document.createElement("p");
                    var orderStatus = document.createElement("p");

                    orderID.textContent = `Order ID: ${order.id}`;
                    customerName.textContent = `Customer Name: ${order.name}`;
                    customerAddress.textContent = `Address: ${order.address}, ${order.zip}, `;
                    customerAddress.textContent += `${order.city}, ${order.country}`;
                    orderStatus.innerHTML = `Status: <span class="status status-${order.status.toLowerCase()}">${order.status}</span>`;
                    
                    orderID.addEventListener("click", function() {
                        _order_details_js__WEBPACK_IMPORTED_MODULE_1__.orderDetails.showOrder(order);
                    });
                    window.mainContainer.appendChild(orderID);
                    window.mainContainer.appendChild(customerName);
                    window.mainContainer.appendChild(customerAddress);
                    window.mainContainer.appendChild(orderStatus);
                });

                window.rootElement.appendChild(window.mainContainer);

                _menu_js__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("orders");
            }).catch(function(error) {
                console.log('The fetch operation failed due to the following error: ',
                    error.message);
            });
    }
};




/***/ }),

/***/ "./js/product.js":
/*!***********************!*\
  !*** ./js/product.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "productObj": () => (/* binding */ productObj)
/* harmony export */ });
/* harmony import */ var _stock_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stock.js */ "./js/stock.js");
/* project */





var productObj = {
    showProduct: function (p) {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("a");

        // title.className = "title";
        title.textContent = "Stock";
        title.className = "product";
        title.addEventListener("click", function() {
            _stock_js__WEBPACK_IMPORTED_MODULE_0__.stock.showStock();
        });
        window.mainContainer.appendChild(title);

        var prodTitle = document.createElement("h2");

        prodTitle.textContent = p.name;

        var prodDesc = document.createElement("p");

        prodDesc.textContent = p.description;

        window.mainContainer.appendChild(prodTitle);
        window.mainContainer.appendChild(prodDesc);
    }
};




/***/ }),

/***/ "./js/stock.js":
/*!*********************!*\
  !*** ./js/stock.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "stock": () => (/* binding */ stock)
/* harmony export */ });
/* harmony import */ var _menu_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./menu.js */ "./js/menu.js");
/* harmony import */ var _product_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product.js */ "./js/product.js");
/* stock */






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
                        _product_js__WEBPACK_IMPORTED_MODULE_1__.productObj.showProduct(product);
                    });
                    window.mainContainer.appendChild(prodName);
                    window.mainContainer.appendChild(prodQty);
                });

                window.rootElement.appendChild(window.mainContainer);

                _menu_js__WEBPACK_IMPORTED_MODULE_0__.menu.showMenu("storage");
            }).catch(function(error) {
                console.log('The fetch operation failed due to the following error: ',
                    error.message);
            });
    }
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.js */ "./js/home.js");
/* main */





(function () {
    window.rootElement = document.getElementById("root");

    window.mainContainer = document.createElement("main");
    window.mainContainer.className = "container";

    window.navigation = document.createElement("nav");
    window.navigation.className = "bottom-nav";

    _home_js__WEBPACK_IMPORTED_MODULE_0__.home.showHome();
})();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9ob21lLmpzIiwid2VicGFjazovL2xhZ2VyMi8uL2pzL21lbnUuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvb3JkZXJfZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9vcmRlcnMuanMiLCJ3ZWJwYWNrOi8vbGFnZXIyLy4vanMvcHJvZHVjdC5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9zdG9jay5qcyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbGFnZXIyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9sYWdlcjIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9sYWdlcjIvLi9qcy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUVhOztBQUVrQjs7QUFFL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsUUFBUSxtREFBYTtBQUNyQjtBQUNBOztBQUVjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ2Q7O0FBRWE7O0FBRWtCO0FBQ0U7QUFDRTs7QUFFbkM7QUFDQTtBQUNBOztBQUVBO0FBQ0EsYUFBYSxrQ0FBa0MsbURBQWEsQ0FBQztBQUM3RCxhQUFhLHNDQUFzQyxzREFBZSxDQUFDO0FBQ25FLGFBQWEsc0NBQXNDLHVEQUFlO0FBQ2xFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTs7QUFFYzs7Ozs7Ozs7Ozs7Ozs7OztBQ2hEZDs7QUFFYTs7QUFFc0I7O0FBRW5DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx1REFBZTtBQUMzQixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDLFNBQVM7QUFDcEQscURBQXFELFdBQVc7QUFDaEUsa0RBQWtELGNBQWMsSUFBSSxVQUFVO0FBQzlFLDBDQUEwQyxXQUFXLElBQUksY0FBYztBQUN2RSxzRUFBc0UsMkJBQTJCLElBQUksYUFBYTs7QUFFbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxhQUFhO0FBQ3RFLHNFQUFzRSxjQUFjO0FBQ3BGLHVFQUF1RSxlQUFlO0FBQ3RGLHFEQUFxRCxpQkFBaUI7QUFDdEUseUVBQXlFLGNBQWM7QUFDdkY7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0Esd0ZBQXdGLGVBQWU7QUFDdkcseUJBQXlCO0FBQ3pCLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRXNCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZJdEI7O0FBRWE7O0FBRWtCO0FBQ2lCOztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVEQUF1RCxTQUFTO0FBQ2hFLGlFQUFpRSxXQUFXO0FBQzVFLDhEQUE4RCxjQUFjLElBQUksVUFBVTtBQUMxRixzREFBc0QsV0FBVyxJQUFJLGNBQWM7QUFDbkYsa0ZBQWtGLDJCQUEyQixJQUFJLGFBQWE7O0FBRTlIO0FBQ0Esd0JBQXdCLHFFQUFzQjtBQUM5QyxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBLGdCQUFnQixtREFBYTtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVnQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3REaEI7O0FBRWE7O0FBRW9COztBQUVqQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNEQUFlO0FBQzNCLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFb0I7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNwQjs7QUFFYTs7QUFFa0I7QUFDUzs7QUFFeEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IsK0RBQXNCO0FBQzlDLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQSxnQkFBZ0IsbURBQWE7QUFDN0IsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFZTs7Ozs7OztVQ2hEZjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BOztBQUVhOztBQUVrQjs7QUFFL0I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSxtREFBYTtBQUNqQixDQUFDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGhvbWUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7bWVudX0gZnJvbSBcIi4vbWVudS5qc1wiO1xuXG52YXIgaG9tZSA9IHtcbiAgICB0aXRsZVRleHQ6IFwiSW5maW5pdHkgV2FyZWhvdXNlc1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIldoZXJlIHByb2R1Y3RzIGdvIHRvIGRpc2FwcGVhclwiLFxuXG4gICAgc2hvd0hvbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICB2YXIgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiV2ViU2hvcFwiO1xuXG4gICAgICAgIHZhciB3ZWxjb21lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuXG4gICAgICAgIHdlbGNvbWUudGV4dENvbnRlbnQgPSBcIldlbGNvbWUgdG8gb3VyIHdlYnNob3AhXCI7XG5cbiAgICAgICAgdmFyIHAxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgcDEudGV4dENvbnRlbnQgPSBcIk9yZGVyIElUIHByb2R1Y3RzIHNhZmVseSBhdCBTY2FuZGluYXZpYSdzIGxhcmdlc3QgSVQgcmV0YWlsZXIuXCI7XG5cbiAgICAgICAgdmFyIHAyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgcDIudGV4dENvbnRlbnQgPSBcIk91ciB3aWRlIHJhbmdlIGluY2x1ZGVzIGNvbXB1dGVyIGVxdWlwbWVudCwgY29tcHV0ZXJzLCB0YWJsZXRzLCBcIiArXG4gICAgICAgICAgICBcIlRWLCBIaUZpLCBwaG90b3MgYW5kIG1vYmlsZSBwaG9uZXMuXCI7XG5cbiAgICAgICAgdmFyIHAzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgcDMudGV4dENvbnRlbnQgPSBcIlNob3Agc2FmZWx5IGFuZCBzZWN1cmVseSBoZXJlIGluIG91ciB3ZWIgc2hvcC5cIjtcblxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHdlbGNvbWUpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChwMSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHAyKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocDMpO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubWFpbkNvbnRhaW5lcik7XG5cbiAgICAgICAgbWVudS5zaG93TWVudShcImhvbWVcIik7XG4gICAgfVxufTtcblxuZXhwb3J0IHtob21lfTtcbiIsIi8qZ2xvYmFsIG1lbnUqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtob21lfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5pbXBvcnQge3N0b2NrfSBmcm9tIFwiLi9zdG9jay5qc1wiO1xuaW1wb3J0IHtvcmRlcnN9IGZyb20gXCIuL29yZGVycy5qc1wiO1xuXG52YXIgbWVudSA9IHtcbiAgICBzaG93TWVudTogZnVuY3Rpb24gKHNlbGVjdGVkKSB7XG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmlubmVySFRNTCA9IFwiXCI7XG5cbiAgICAgICAgdmFyIG5hdkVsZW1lbnRzID0gW1xuICAgICAgICAgICAge25hbWU6IFwiSG9tZVwiLCBjbGFzczogXCJob21lXCIsIG5hdjogaG9tZS5zaG93SG9tZX0sXG4gICAgICAgICAgICB7bmFtZTogXCJTdG9ja1wiLCBjbGFzczogXCJzdG9yYWdlXCIsIG5hdjogc3RvY2suc2hvd1N0b2NrfSxcbiAgICAgICAgICAgIHtuYW1lOiBcIk9yZGVyc1wiLCBjbGFzczogXCJvcmRlcnNcIiwgbmF2OiBvcmRlcnMuc2hvd0xpc3R9XG4gICAgICAgIF07XG5cbiAgICAgICAgbmF2RWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIG5hdkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkID09PSBlbGVtZW50LmNsYXNzKSB7XG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc05hbWUgPSBcImFjdGl2ZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBuYXZFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlbGVtZW50Lm5hdik7XG5cbiAgICAgICAgICAgIC8vIHZhciBpY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlcIik7XG5cbiAgICAgICAgICAgIC8vIGljb24uY2xhc3NOYW1lID0gXCJtYXRlcmlhbC1pY29uc1wiO1xuICAgICAgICAgICAgLy8gaWNvbi50ZXh0Q29udGVudCA9IGVsZW1lbnQuY2xhc3M7XG4gICAgICAgICAgICAvLyBuYXZFbGVtZW50LmFwcGVuZENoaWxkKGljb24pO1xuXG4gICAgICAgICAgICAvLyB2YXIgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuXG4gICAgICAgICAgICAvLyB0ZXh0LmNsYXNzTmFtZSA9IFwiaWNvbi10ZXh0XCI7XG4gICAgICAgICAgICAvLyB0ZXh0LnRleHRDb250ZW50ID0gZWxlbWVudC5uYW1lO1xuICAgICAgICAgICAgLy8gbmF2RWxlbWVudC5hcHBlbmRDaGlsZCh0ZXh0KTtcblxuICAgICAgICAgICAgbmF2RWxlbWVudC50ZXh0Q29udGVudCA9IGVsZW1lbnQubmFtZTtcblxuICAgICAgICAgICAgd2luZG93Lm5hdmlnYXRpb24uYXBwZW5kQ2hpbGQobmF2RWxlbWVudCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdpbmRvdy5yb290RWxlbWVudC5hcHBlbmRDaGlsZCh3aW5kb3cubmF2aWdhdGlvbik7XG4gICAgfVxufTtcblxuZXhwb3J0IHttZW51fTtcbiIsIi8qIE9yZGVyIERldGFpbCAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtvcmRlcnN9IGZyb20gXCIuL29yZGVycy5qc1wiO1xuXG4vLyBjb25zdCBhcGlfa2V5PSBcIjgzNDNkOWIyOWI5YTIyMWE0NzU1YmY3ZjBlM2NmNzc2XCI7XG5jb25zdCBhcGlfa2V5PSBcIjIzMzY5YTQ0NDUzNGQyNzY1Y2RiYzUyMzk2YzA3MzQ4XCI7XG5cbnZhciBvcmRlckRldGFpbHMgPSB7XG4gICAgc2hvd09yZGVyOiBmdW5jdGlvbiAob3JkZXIpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICB2YXIgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIk9yZGVyc1wiO1xuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcIlwiO1xuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvcmRlcnMuc2hvd0xpc3QoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICB2YXIgb3JkZXJJRCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcbiAgICAgICAgdmFyIGN1c3RvbWVyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICB2YXIgY3VzdG9tZXJBZGRyZXNzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHZhciBvcmRlclN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gICAgICAgIG9yZGVySUQudGV4dENvbnRlbnQgPSBgT3JkZXIgSUQ6ICR7b3JkZXIuaWR9YDtcbiAgICAgICAgY3VzdG9tZXJOYW1lLnRleHRDb250ZW50ID0gYEN1c3RvbWVyIE5hbWU6ICR7b3JkZXIubmFtZX1gO1xuICAgICAgICBjdXN0b21lckFkZHJlc3MudGV4dENvbnRlbnQgPSBgQWRkcmVzczogJHtvcmRlci5hZGRyZXNzfSwgJHtvcmRlci56aXB9LCBgO1xuICAgICAgICBjdXN0b21lckFkZHJlc3MudGV4dENvbnRlbnQgKz0gYCR7b3JkZXIuY2l0eX0sICR7b3JkZXIuY291bnRyeX1gO1xuICAgICAgICBvcmRlclN0YXR1cy5pbm5lckhUTUwgPSBgU3RhdHVzOiA8c3BhbiBjbGFzcz1cInN0YXR1cyBzdGF0dXMtJHtvcmRlci5zdGF0dXMudG9Mb3dlckNhc2UoKX1cIj4ke29yZGVyLnN0YXR1c308L3NwYW4+YDtcblxuICAgICAgICB2YXIgb3JkZXJJdGVtcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgICAgICAgdmFyIHRIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhlYWRcIik7XG4gICAgICAgIHZhciB0Qm9keSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0Ym9keVwiKTtcbiAgICAgICAgdmFyIHRIZWFkZXJIdG1sID0gXCJcIjtcbiAgICAgICAgdmFyIHRCb2R5SHRtbCA9IFwiXCI7XG4gICAgICAgIHRIZWFkZXJIdG1sID0gXCI8dHI+XCI7XG4gICAgICAgIHRIZWFkZXJIdG1sICs9IFwiPHRoPlByb2R1Y3QgTmFtZTwvdGg+XCI7XG4gICAgICAgIHRIZWFkZXJIdG1sICs9IFwiPHRoPlByaWNlPC90aD5cIjtcbiAgICAgICAgdEhlYWRlckh0bWwgKz0gXCI8dGg+QW1vdW50PC90aD5cIjtcbiAgICAgICAgdEhlYWRlckh0bWwgKz0gXCI8dGg+TG9jYXRpb248L3RoPlwiO1xuICAgICAgICB0SGVhZGVySHRtbCArPSBcIjx0aD5JbiBTdG9jazwvdGg+XCI7XG4gICAgICAgIHRIZWFkZXJIdG1sICs9IFwiPC90cj5cIjtcbiAgICAgICAgdEhlYWRlci5pbm5lckhUTUwgPSB0SGVhZGVySHRtbDtcblxuICAgICAgICB2YXIgcGFja0F2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgIG9yZGVyLm9yZGVyX2l0ZW1zLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICBwYWNrQXZhaWxhYmxlID0gKHByb2R1Y3QuYW1vdW50ID4gcHJvZHVjdC5zdG9jaykgPyBmYWxzZSA6IHBhY2tBdmFpbGFibGU7XG4gICAgICAgICAgICB2YXIgcHJvZEh0bWwgPSBcIlwiO1xuICAgICAgICAgICAgcHJvZEh0bWwgKz0gKHByb2R1Y3QuYW1vdW50ID4gcHJvZHVjdC5zdG9jaykgPyBcIjx0ciBjbGFzcz0ndW5wYWNrYWJsZSc+XCIgOiBcIjx0cj5cIjtcbiAgICAgICAgICAgIHByb2RIdG1sICs9IGA8dGQgZGF0YS10aXRsZT0nUHJvZHVjdCBOYW1lJz4ke3Byb2R1Y3QubmFtZX08L3RkPmA7XG4gICAgICAgICAgICBwcm9kSHRtbCArPSBgPHRkIGRhdGEtdGl0bGU9J1ByaWNlJyBjbGFzcz0nbnVtYmVyLWNlbGwnPiR7cHJvZHVjdC5wcmljZX08L3RkPmA7XG4gICAgICAgICAgICBwcm9kSHRtbCArPSBgPHRkIGRhdGEtdGl0bGU9J0Ftb3VudCcgY2xhc3M9J251bWJlci1jZWxsJz4ke3Byb2R1Y3QuYW1vdW50fTwvdGQ+YDtcbiAgICAgICAgICAgIHByb2RIdG1sICs9IGA8dGQgZGF0YS10aXRsZT0nTG9jYXRpb24nPiR7cHJvZHVjdC5sb2NhdGlvbn08L3RkPmA7XG4gICAgICAgICAgICBwcm9kSHRtbCArPSBgPHRkIGRhdGEtdGl0bGU9J0luIFN0b2NrJyBjbGFzcz0nbnVtYmVyLWNlbGwnPiR7cHJvZHVjdC5zdG9ja308L3RkPmA7XG4gICAgICAgICAgICBwcm9kSHRtbCArPSBcIjwvdHI+XCI7XG4gICAgICAgICAgICB0Qm9keUh0bWwgKz0gcHJvZEh0bWw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG9yZGVySXRlbXMuY2xhc3NOYW1lID0gXCJ0YWJsZSB0YWJsZS1zdGFja2VkIHRhYmxlLXN0cmlwZWRcIjtcbiAgICAgICAgdEJvZHkuaW5uZXJIVE1MID0gdEJvZHlIdG1sO1xuICAgICAgICBvcmRlckl0ZW1zLmFwcGVuZENoaWxkKHRIZWFkZXIpO1xuICAgICAgICBvcmRlckl0ZW1zLmFwcGVuZENoaWxkKHRCb2R5KTtcblxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlcklEKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY3VzdG9tZXJOYW1lKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY3VzdG9tZXJBZGRyZXNzKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQob3JkZXJTdGF0dXMpO1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlckl0ZW1zKTtcblxuICAgICAgICBpZiAob3JkZXIuc3RhdHVzX2lkID09IDEwMCAmJiBwYWNrQXZhaWxhYmxlKSB7XG4gICAgICAgICAgICB2YXIgcGFja0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgICAgICBwYWNrQnV0dG9uLnRleHRDb250ZW50ID0gXCJQYWNrXCI7XG4gICAgICAgICAgICBwYWNrQnV0dG9uLmNsYXNzTmFtZSA9IFwiYnV0dG9uIGdyZWVuLWJ1dHRvbiBwdXNoLXQtMVwiO1xuICAgICAgICAgICAgcGFja0J1dHRvbi5pZCA9IFwicGFjay1idXR0b25cIjtcbiAgICAgICAgICAgIHBhY2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBvX2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBvcmRlci5pZCxcbiAgICAgICAgICAgICAgICAgICAgc3RhdHVzX2lkOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgIGFwaV9rZXk6IGFwaV9rZXlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL29yZGVyc1wiLCB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9fZGF0YSksXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAvL3VwZGF0ZSBzdG9jayBiYWxhbmNlXG4gICAgICAgICAgICAgICAgICAgIG9yZGVyLm9yZGVyX2l0ZW1zLmZvckVhY2gocHJvZHVjdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcF9kYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwcm9kdWN0LnByb2R1Y3RfaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogcHJvZHVjdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrOiBwcm9kdWN0LnN0b2NrIC0gcHJvZHVjdC5hbW91bnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBpX2tleTogYXBpX2tleVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKFwiaHR0cHM6Ly9sYWdlci5lbWlsZm9saW5vLnNlL3YyL3Byb2R1Y3RzXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShwX2RhdGEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnY29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocHJvZHVjdC5uYW1lICsgYC0+IHN0b2NrIGJhbGFuY2Ugd2FzIHJlZHVjZWQgKCR7cHJvZHVjdC5hbW91bnR9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgPSBcIk9yZGVyIHdhcyBwYWNrZWQgc3VjY2Vzc2Z1bGx5IVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9IFwidGV4dC1zdWNjZXNzIHB1c2gtdC0xXCI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgPSBcIkVycm9yIG9jY3VycyB3aGlsZSBwcm9jZXNzaW5nIVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmNsYXNzTmFtZSA9IFwidGV4dC1kYW5nZXIgcHVzaC10LTFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwYWNrLWJ1dHRvblwiKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocGFja0J1dHRvbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgPSBcIllvdSBjYW4ndCBwYWNrIHRoaXMgb3JkZXIgXCI7XG4gICAgICAgICAgICBub3RpZmljYXRpb24udGV4dENvbnRlbnQgKz0gXCJiZWNhdXNlIGFscmVhZHkgcGFja2VkIG9yIG5vdCBlbm91Z2ggcHJvamVjdHMuXCI7XG4gICAgICAgICAgICBub3RpZmljYXRpb24uY2xhc3NOYW1lID0gXCJ1bnBhY2thYmxlIHB1c2gtdC0xXCI7XG4gICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IHtvcmRlckRldGFpbHN9O1xuIiwiLyogT3JkZXJzICovXG5cblwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQge21lbnV9IGZyb20gXCIuL21lbnUuanNcIjtcbmltcG9ydCB7b3JkZXJEZXRhaWxzfSBmcm9tIFwiLi9vcmRlcl9kZXRhaWxzLmpzXCI7XG5cbnZhciBvcmRlcnMgPSB7XG4gICAgc2hvd0xpc3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgICB2YXIgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG5cbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xuICAgICAgICB0aXRsZS50ZXh0Q29udGVudCA9IFwiT3JkZXIgTGlzdFwiO1xuXG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICBmZXRjaChcImh0dHBzOi8vbGFnZXIuZW1pbGZvbGluby5zZS92Mi9vcmRlcnM/YXBpX2tleT0yMzM2OWE0NDQ1MzRkMjc2NWNkYmM1MjM5NmMwNzM0OFwiKVxuICAgICAgICAvLyBmZXRjaChcImh0dHBzOi8vbGFnZXIuZW1pbGZvbGluby5zZS92Mi9vcmRlcnM/YXBpX2tleT04MzQzZDliMjliOWEyMjFhNDc1NWJmN2YwZTNjZjc3NlwiKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGEuZm9yRWFjaChmdW5jdGlvbihvcmRlcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3JkZXJJRCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3VzdG9tZXJOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXN0b21lckFkZHJlc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9yZGVyU3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgb3JkZXJJRC50ZXh0Q29udGVudCA9IGBPcmRlciBJRDogJHtvcmRlci5pZH1gO1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21lck5hbWUudGV4dENvbnRlbnQgPSBgQ3VzdG9tZXIgTmFtZTogJHtvcmRlci5uYW1lfWA7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyQWRkcmVzcy50ZXh0Q29udGVudCA9IGBBZGRyZXNzOiAke29yZGVyLmFkZHJlc3N9LCAke29yZGVyLnppcH0sIGA7XG4gICAgICAgICAgICAgICAgICAgIGN1c3RvbWVyQWRkcmVzcy50ZXh0Q29udGVudCArPSBgJHtvcmRlci5jaXR5fSwgJHtvcmRlci5jb3VudHJ5fWA7XG4gICAgICAgICAgICAgICAgICAgIG9yZGVyU3RhdHVzLmlubmVySFRNTCA9IGBTdGF0dXM6IDxzcGFuIGNsYXNzPVwic3RhdHVzIHN0YXR1cy0ke29yZGVyLnN0YXR1cy50b0xvd2VyQ2FzZSgpfVwiPiR7b3JkZXIuc3RhdHVzfTwvc3Bhbj5gO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJJRC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmRlckRldGFpbHMuc2hvd09yZGVyKG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKG9yZGVySUQpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjdXN0b21lck5hbWUpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjdXN0b21lckFkZHJlc3MpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcmRlclN0YXR1cyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbWVudS5zaG93TWVudShcIm9yZGVyc1wiKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RoZSBmZXRjaCBvcGVyYXRpb24gZmFpbGVkIGR1ZSB0byB0aGUgZm9sbG93aW5nIGVycm9yOiAnLFxuICAgICAgICAgICAgICAgICAgICBlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7b3JkZXJzfTtcbiIsIi8qIHByb2plY3QgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7c3RvY2t9IGZyb20gXCIuL3N0b2NrLmpzXCI7XG5cbnZhciBwcm9kdWN0T2JqID0ge1xuICAgIHNob3dQcm9kdWN0OiBmdW5jdGlvbiAocCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXG4gICAgICAgIC8vIHRpdGxlLmNsYXNzTmFtZSA9IFwidGl0bGVcIjtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBcIlN0b2NrXCI7XG4gICAgICAgIHRpdGxlLmNsYXNzTmFtZSA9IFwicHJvZHVjdFwiO1xuICAgICAgICB0aXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzdG9jay5zaG93U3RvY2soKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgICAgICB2YXIgcHJvZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpO1xuXG4gICAgICAgIHByb2RUaXRsZS50ZXh0Q29udGVudCA9IHAubmFtZTtcblxuICAgICAgICB2YXIgcHJvZERlc2MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblxuICAgICAgICBwcm9kRGVzYy50ZXh0Q29udGVudCA9IHAuZGVzY3JpcHRpb247XG5cbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZFRpdGxlKTtcbiAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZERlc2MpO1xuICAgIH1cbn07XG5cbmV4cG9ydCB7cHJvZHVjdE9ian07XG4iLCIvKiBzdG9jayAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHttZW51fSBmcm9tIFwiLi9tZW51LmpzXCI7XG5pbXBvcnQge3Byb2R1Y3RPYmp9IGZyb20gXCIuL3Byb2R1Y3QuanNcIjtcblxudmFyIHN0b2NrID0ge1xuICAgIHNob3dTdG9jazogZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuXG4gICAgICAgIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gXCJTdG9jayBwYXJ0IDFcIjtcblxuICAgICAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICAgICAgZmV0Y2goXCJodHRwczovL2xhZ2VyLmVtaWxmb2xpbm8uc2UvdjIvcHJvZHVjdHM/YXBpX2tleT0yMzM2OWE0NDQ1MzRkMjc2NWNkYmM1MjM5NmMwNzM0OFwiKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmRhdGEuZm9yRWFjaChmdW5jdGlvbihwcm9kdWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9kTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZFF0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgIHByb2ROYW1lLnRleHRDb250ZW50ID0gcHJvZHVjdC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBwcm9kUXR5LnRleHRDb250ZW50ID0gYFF1YW50aXR5OiAke3Byb2R1Y3Quc3RvY2t9YDtcbiAgICAgICAgICAgICAgICAgICAgcHJvZE5hbWUuY2xhc3NOYW1lID0gXCJwcm9kdWN0XCI7XG4gICAgICAgICAgICAgICAgICAgIHByb2RRdHkuY2xhc3NOYW1lID0gXCJwcm9kdWN0LXF1YW50aXR5XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgcHJvZE5hbWUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdE9iai5zaG93UHJvZHVjdChwcm9kdWN0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5tYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2ROYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvZFF0eSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB3aW5kb3cucm9vdEVsZW1lbnQuYXBwZW5kQ2hpbGQod2luZG93Lm1haW5Db250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbWVudS5zaG93TWVudShcInN0b3JhZ2VcIik7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGUgZmV0Y2ggb3BlcmF0aW9uIGZhaWxlZCBkdWUgdG8gdGhlIGZvbGxvd2luZyBlcnJvcjogJyxcbiAgICAgICAgICAgICAgICAgICAgZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59O1xuXG5leHBvcnQge3N0b2NrfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyogbWFpbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHtob21lfSBmcm9tIFwiLi9ob21lLmpzXCI7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgd2luZG93LnJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb290XCIpO1xuXG4gICAgd2luZG93Lm1haW5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibWFpblwiKTtcbiAgICB3aW5kb3cubWFpbkNvbnRhaW5lci5jbGFzc05hbWUgPSBcImNvbnRhaW5lclwiO1xuXG4gICAgd2luZG93Lm5hdmlnYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibmF2XCIpO1xuICAgIHdpbmRvdy5uYXZpZ2F0aW9uLmNsYXNzTmFtZSA9IFwiYm90dG9tLW5hdlwiO1xuXG4gICAgaG9tZS5zaG93SG9tZSgpO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=