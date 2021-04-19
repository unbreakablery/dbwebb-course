"use strict";

import m from 'mithril';

let list = {
    view: function() {
        var startYear = 1900;
        var endYear = 2020;
        var years = [];

        while (startYear <= endYear) {
            years.push(
                m(
                    "a.button.blue-button",
                    {href: "#!/year/" + startYear},
                    startYear
                )
            );
            startYear++;
        }

        return m("main.container", [
            m("h1", "Nobel Festival"),
            m("p", "Select a year from the list:"),
            m("div.year-container", years)
        ]);
    }
};

export {list};