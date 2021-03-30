/* global menu */
"use strict";

var home = (function () {
    var showHome = function () {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "Benaris Hajduk";

        var greeting = document.createElement("p");
        var timeOfDayGreeting = "Hello";
        var now = new Date();

        if (now.getHours() <= 10) {
            timeOfDayGreeting = "Good morning";
        } else if (now.getHours() >= 17) {
            timeOfDayGreeting = "Good evening";
        }

        greeting.textContent = timeOfDayGreeting +
            ", my name is Benaris Hajduk and I am a student in the course webapp. ";

        var image = document.createElement("img");

        image.src = "benny-small.jpg";
        image.alt = "Benaris Hajduk";

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(greeting);
        window.mainContainer.appendChild(image);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("home");
    };

    return {
        showHome: showHome
    };
})(home);