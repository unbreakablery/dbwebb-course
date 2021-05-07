var m = require("mithril");

var order = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/orders",
    currentOrders: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: order.url + "?api_key=" + order.apiKey
        }).then(function(result) {
            order.currentOrders = result.data;
        });
    },
    loadPackedAll: function() {
        return m.request({
            method: "GET",
            url: order.url + "?api_key=" + order.apiKey
        }).then(function(result) {
            order.currentOrders = result.data.filter(function(o) {
                return o.status_id == 200;
            });
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
    },
    getStatusByID: function(id) {
        switch (id) {
            case 100:
                return "Ny";
                break;
            case 200:
                return "Packad";
                break;
            case 400:
                return "Skickad";
                break;
            case 600:
                return "Fakturerad";
                break;
            case 800:
                return "Retur";
                break;
            case 900:
                return "Återbetald";
                break;
            default:
                return "Unknown Status";
        }
    }
};

export { order };
