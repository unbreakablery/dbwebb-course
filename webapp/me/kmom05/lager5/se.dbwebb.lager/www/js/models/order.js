var m = require("mithril");

var order = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/orders",
    statusTypes: [
        {"name": "Ny", "value": 100},
        {"name": "Packad", "value": 200},
        {"name": "Skickad", "value": 400},
        {"name": "Fakturerad", "value": 600},
        {"name": "Retur", "value": 800},
        {"name": "Återbetald", "value": 900}
    ],
    currentOrders: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: order.url + "?api_key=" + order.apiKey
        }).then(function(result) {
            order.currentOrders = result.data;
        });
    },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: order.url + "/" + id + "?api_key=" + order.apiKey
        }).then(function(result) {
            order.current = result.data;
        });
    },
    save: function() {
        order.current.api_key = order.apiKey;

        return m.request({
            method: "PUT",
            url: order.url,
            body: order.current
        }).then(function() {
            let page = order.current.page ?? "/orders";
            order.resetOrder();
            return m.route.set(page);
        });
    },
    add: function() {
        order.current.api_key = order.apiKey;

        return m.request({
            method: "POST",
            url: order.url,
            body: order.current
        }).then(function() {
            order.resetOrder();

            return m.route.set("/orders");
        });
    },
    resetOrder: function() {
        order.current = {};
    }
};

export { order };
