var m = require("mithril");

import { product } from "../models/product";

var delivery = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/deliveries",
    cakeTypes: ["Tårta", "Bröd", "Småkaka"],
    currentDeliveries: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: delivery.url + "?api_key=" + delivery.apiKey
        }).then(function(result) {
            delivery.currentDeliveries = result.data;
        });
    },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: delivery.url + "/" + id + "?api_key=" + delivery.apiKey
        }).then(function(result) {
            delivery.current = result.data;
        });
    },
    save: function() {
        delivery.current.api_key = delivery.apiKey;

        return m.request({
            method: "PUT",
            url: delivery.url,
            body: delivery.current
        }).then(function() {
            delivery.resetDelivery();

            return m.route.set("/");
        });
    },
    add: function() {
        delivery.current.api_key = delivery.apiKey;

        return m.request({
            method: "POST",
            url: delivery.url,
            body: delivery.current
        }).then(function() {
            // increase product stock
            let p = product.currentProducts.find(element => element.id == delivery.current.product_id);

            product.current.id = p.id;
            product.current.stock = p.stock + delivery.current.amount;
            product.save();

            delivery.resetDelivery();

            return m.route.set("/");
        });
    },
    resetDelivery: function() {
        delivery.current = {};
    }
};

export { delivery };
