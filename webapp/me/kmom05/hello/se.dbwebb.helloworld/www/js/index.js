import m from "mithril";
import hello from "./views/hello";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
     // Cordova is now initialized. Have fun!

    m.mount(document.body, hello);
}
