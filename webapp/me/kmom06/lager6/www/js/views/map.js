"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import position from "../models/position.js";

import locationIcon from "../../img/location.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import { order } from "../models/order";

var map;
var locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

function showMap() {
    var geocoder = new OpenStreetMapProvider();

    geocoder
        // .search({ query: order.current.address + ', ' + order.current.city + ', ' + order.current.country })
        .search({ query: order.current.address })
        .then(function(result) {
            if (result.length > 0) {
                map = L.map('map').setView([result[0].y, result[0].x], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
                    attribution: `&copy;
                    <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors`
                }).addTo(map);
                L.marker(
                    [result[0].y, result[0].x]
                ).addTo(map).bindPopup(result[0].label);
                showPosition();
            } else {
                map = L.map('map').setView([56.181932, 15.590525], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
                    attribution: `&copy;
                    <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors`
                }).addTo(map);
                showPosition();
            }
        })
        .catch(function(error) {
            map = L.map('map').setView([56.181932, 15.590525], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
                    attribution: `&copy;
                    <a href="https://www.openstreetmap.org/copyright">
                    OpenStreetMap</a> contributors`
                }).addTo(map);
                showPosition();
        });
    
}

function showPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

const mapView = {
    oninit: function(vnode) {
        position.getPosition();
    },
    oncreate: function(vnode) {
        let id = vnode.children[0].attrs.id;
        order.load(id).then(function() {
            showMap();
        });
    },
    view: function() {
        return [
            m("h3", "Map"),
            m("div#map.map", "")
        ];
    }
};

export default mapView;