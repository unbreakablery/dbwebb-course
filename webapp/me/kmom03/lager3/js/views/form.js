import m from 'mithril';
import { delivery } from "../models/delivery.js";

let editForm = {
    oninit: function(vnode) {
        delivery.load(vnode.attrs.id);
    },
    view: function() {
        return m("div.container", [
            m("h2", "Ändra kaka"),
            m("form", {
                onsubmit: function(event) {
                    event.preventDefault();
                    delivery.save();
                } }, [
                m("label.input-label", "Namn"),
                m("input.input[type=text][placeholder=Name]", {
                    oninput: function (e) {
                        delivery.current.name = e.target.value;
                    },
                    value: delivery.current.name
                }),
                m("label.input-label", "Lagerplats"),
                m("input.input[type=text][placeholder=Lagerplats]", {
                    oninput: function (e) {
                        delivery.current.location = e.target.value;
                    },
                    value: delivery.current.location
                }),
                m("label.input-label", "Lagersaldo"),
                m("input.input[type=number][placeholder=Lagersaldo]", {
                    oninput: function (e) {
                        delivery.current.stock = parseInt(e.target.value);
                    },
                    value: delivery.current.stock
                }),
                m("label.input-label", "Typ"),
                m("select.input", {
                    onchange: function (e) {
                        delivery.current.specifiers = parseInt(e.target.value);
                    }
                }, delivery.cakeTypes.map(function(cakeType) {
                    return m("option", { value: cakeType }, cakeType);
                })),
                m("input.button.green-button[type=submit][value=Save].button", "Spara")
            ])
        ]);
    }
};

export { editForm };
