var m = require("mithril");

module.exports = {
    onbeforeremove: function(vnode) {
        vnode.dom.classList.add("slide-out");
        return new Promise(function(resolve) {
            setTimeout(function() {
                vnode.dom.classList.remove("slide-out");
                resolve();
            }, 250);
        });
    },
    view: function(vnode) {
         return m("div.slide-in.detail-" + vnode.attrs.id, [
            m("a", { href: "#!/list" }, "Back"),
            m("h1", "Details of " + vnode.attrs.id)
        ]);
    }
};