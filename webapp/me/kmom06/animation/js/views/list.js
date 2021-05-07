"use strict";

var m = require("mithril");

var list = {
    view: function() {
        return m("div.list", [
            m(
                "a.list-item",
                { href: "#!/detail/1" },
                "Number 1"
            ),
            m(
                "a.list-item",
                { href: "#!/detail/2" },
                "Number 2"
            )
        ]);
    }
};

module.exports = list;