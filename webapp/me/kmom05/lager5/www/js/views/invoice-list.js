"use strict";

import m from 'mithril';
import { invoice } from '../models/invoice';

const invoiceComponent = {
    view: function(vnode) {
        let current = vnode.attrs;

        return m("tr", [
            m('td[data-title="ID"]', current.id),
            m('td[data-title="Name"]', current.name),
            m('td[data-title="Address"]', current.address),
            m('td[data-title="City"]', current.city),
            m('td[data-title="Country"]', current.country),
            m('td[data-title="Zip"]', current.zip),
            m('td[data-title="Order ID"]', current.order_id),
            m('td[data-title="Total Price"]', current.total_price),
            m('td[data-title="Creation Date"]', current.creation_date),
            m('td[data-title="Due Date"]', current.due_date)
        ]);
    }
};

let invoiceList = {
    oninit: invoice.loadAll,
    view: function() {
        return m("div.container", [
            m("h1", "Invoices"),
            m(
                "a.button.blue-button.full-width-button",
                { href: "#!/invoice-new" },
                "New Invoice"
            ),
            m("table", { class: "table table-stacked table-striped"}, [
                m("thead", [
                    m("tr", [
                        m("th", "ID"),
                        m("th", "Name"),
                        m("th", "Address"),
                        m("th", "City"),
                        m("th", "Country"),
                        m("th", "Zip"),
                        m("th", "Order ID"),
                        m("th", "Total Price"),
                        m("th", "Creation Date"),
                        m("th", "Due Date")
                    ])
                ]),
                m("tbody", invoice.currentInvoices.map(function(invoice) {
                    return m(invoiceComponent, invoice);
                }))
            ])
        ]);
    }
};

export { invoiceList };
