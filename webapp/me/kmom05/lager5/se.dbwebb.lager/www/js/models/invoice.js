var m = require("mithril");
import { auth } from '../models/auth';
import { order } from '../models/order';

var invoice = {
    apiKey: "23369a444534d2765cdbc52396c07348",
    url: "https://lager.emilfolino.se/v2/invoices",
    currentInvoices: [],
    loadAll: function() {
        return m.request({
            method: "GET",
            url: invoice.url + "?api_key=" + invoice.apiKey,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            invoice.currentInvoices = result.data;
        });
    },
    current: {},
    load: function(id) {
        return m.request({
            method: "GET",
            url: invoice.url + "/" + id + "?api_key=" + invoice.apiKey,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function(result) {
            invoice.current = result.data;
        });
    },
    save: function() {
        invoice.current.api_key = invoice.apiKey;

        return m.request({
            method: "PUT",
            url: invoice.url,
            body: invoice.current,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function() {
            invoice.resetInvoice();

            return m.route.set("/invoices");
        });
    },
    add: function() {
        invoice.current.api_key = invoice.apiKey;

        return m.request({
            method: "POST",
            url: invoice.url,
            body: invoice.current,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function() {
            // change order status
            order.current.status_id = 600;
            order.save();

            invoice.resetInvoice();

            return m.route.set("/invoices");
        });
    },
    delete: function() {
        invoice.current.api_key = invoice.apiKey;

        return m.request({
            method: "DELETE",
            url: invoice.url,
            body: invoice.current,
            headers: {
                'x-access-token': auth.token
            }
        }).then(function() {
            invoice.resetInvoice();

            return m.route.set("/invoices");
        });
    },
    resetInvoice: function() {
        invoice.current = {};
    }
};

export { invoice };
