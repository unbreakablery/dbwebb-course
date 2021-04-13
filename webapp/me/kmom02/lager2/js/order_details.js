/* Order Detail */

"use strict";

import {orders} from "./orders.js";

// const api_key= "8343d9b29b9a221a4755bf7f0e3cf776";
const api_key= "23369a444534d2765cdbc52396c07348";

var orderDetails = {
    showOrder: function (order) {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("a");
        title.textContent = "Orders";
        title.className = "";
        title.addEventListener("click", function() {
            orders.showList();
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

export {orderDetails};
