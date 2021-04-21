var m = require("mithril");

var product = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/products",
    currentProducts: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: product.url + "?api_key=" + product.apiKey
        }).then(function(result) {
            product.currentProducts = result.data;
        });
    },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: product.url + "/" + id + "?api_key=" + product.apiKey
        }).then(function(result) {
            product.current = result.data;
        });
    },
    save: function() {
        product.current.api_key = product.apiKey;

        return m.request({
            method: "PUT",
            url: product.url,
            body: product.current
        }).then(function() {
            product.resetProduct();

            return m.route.set("/products");
        });
    },
    add: function() {
        product.current.api_key = product.apiKey;

        return m.request({
            method: "POST",
            url: product.url,
            body: product.current
        }).then(function() {
            product.resetProduct();

            return m.route.set("/products");
        });
    },
    delete: function() {
        product.current.api_key = product.apiKey;

        return m.request({
            method: "DELETE",
            url: product.url,
            body: product.current
        }).then(function() {
            product.resetProduct();

            return m.route.set("/products");
        });
    },
    resetProduct: function() {
        product.current = {};
    }
};

export { product };
