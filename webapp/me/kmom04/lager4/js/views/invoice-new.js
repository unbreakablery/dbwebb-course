import m from 'mithril';
import { order } from "../models/order";
import { invoice } from "../models/invoice";

let newInvoiceForm = {
    oninit: function() {
        order.loadAll();
        order.resetOrder();
        order.current.page = "/invoices";
        invoice.resetInvoice();
    },
    view: function() {
        return m("div.container", [
            m("h2", "New Invoice"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    invoice.add();
                } }, [
                m("label.input-label", "Order"),
                m("select.input[required]", {
                    onchange: function (e) {
                        order.current.id = parseInt(e.target.value);
                        invoice.current.order_id = parseInt(e.target.value);
                    }
                }, [
                    m("option", { value: ''}, ''),
                    order.currentOrders.map(function(order) {
                        if (order.status_id != 600) {
                            return m("option", { value: order.id }, "ID: " + order.id + ", "+ order.name);
                        }
                    })]
                ),
                m("label.input-label", "Total Price"),
                m("input.input[type=number][placeholder=Total Price][required]", {
                    oninput: function (e) {
                        invoice.current.total_price = parseInt(e.target.value);
                    },
                    value: invoice.current.total_price,
                    min: 0
                }),
                m("label.input-label", "Creation Date"),
                m("input.input[type=date][placeholder=Creation Date]", {
                    oninput: function (e) {
                        invoice.current.creation_date = e.target.value;
                    },
                    value: invoice.current.creation_date
                }),
                m("label.input-label", "Due Date"),
                m("input.input[type=date][placeholder=Due Date]", {
                    oninput: function (e) {
                        invoice.current.due_date = e.target.value;
                    },
                    value: invoice.current.due_date
                }),
                m("input.button.green-button[type=submit][value=Save].button", "Create Invoice")
            ])
        ]);
    }
};

export { newInvoiceForm };
