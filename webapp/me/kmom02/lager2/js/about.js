/* about */

"use strict";

var about = (function () {
    var showAbout = function () {
        window.mainContainer.innerHTML = "";

        var title = document.createElement("h1");

        title.className = "title";
        title.textContent = "About";

        var aboutP1 = document.createElement("p");

        aboutP1.textContent = "Hi, My name is Benaris Hajduk and I am 33 years old. " +
            "Born and raised in Bosnia, Zenica, one of the world's most beautiful " +
            "small towns (iaf to me). I am married and have two wonderful children. " +
            "The Leali girl is 5 years old, and the son Lean is 3 years old.";

        var aboutP2 = document.createElement("p");

        aboutP2.textContent = "We moved to Sweden in August 2016, " +
            "because we like challenges and like to solve problems " +
            "(if you can joke a little). I have always had a great interest in the web, " +
            "programming and data. Then I ended up in your program.";

        var aboutP3 = document.createElement("p");

        aboutP3.textContent = "As a person, I am very open and ready to accept any " +
            "challenging position regardless of my previous work experience. " +
            "My will to work and ability to organize myself in the best possible way.";

        var aboutP4 = document.createElement("p");

        aboutP4.textContent = "Has the ability to communicate with people at all levels " +
            "regardless of their national and ethnic background. I am prepared to handle " +
            "difficult and demanding tasks given by supervisors and to take responsibility " +
            "given to me and perform my work in the best possible way. People, especially " +
            "clients and colleagues that I come in contact with, describe me as an honest, " +
            "hardworking, nice, good-natured, and calm person.";

        var aboutP5 = document.createElement("p");

        aboutP5.textContent = "My hobbies, maybe can say that I am a real wine lover, " +
            "not quite sure that it is a hobby, but to me it is even more because " +
            "I worked as a waiter, somelier and bar manager. Likes football and of " +
            "course programming.";

        window.mainContainer.appendChild(title);
        window.mainContainer.appendChild(aboutP1);
        window.mainContainer.appendChild(aboutP2);
        window.mainContainer.appendChild(aboutP3);
        window.mainContainer.appendChild(aboutP4);
        window.mainContainer.appendChild(aboutP5);

        window.rootElement.appendChild(window.mainContainer);

        menu.showMenu("free_breakfast");
    };

    return {
        showAbout: showAbout
    };
})(about);
