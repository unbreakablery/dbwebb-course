/* Orders */

"use strict";

import {menu} from "./menu.js";
import {orderDetails} from "./order_details.js";

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
                        orderDetails.showOrder(order);
                    });
                    window.mainContainer.appendChild(orderID);
                    window.mainContainer.appendChild(customerName);
                    window.mainContainer.appendChild(customerAddress);
                    window.mainContainer.appendChild(orderStatus);
                });

                window.rootElement.appendChild(window.mainContainer);

                menu.showMenu("orders");
            }).catch(function(error) {
                console.log('The fetch operation failed due to the following error: ',
                    error.message);
            });
    }
};

export {orders};
