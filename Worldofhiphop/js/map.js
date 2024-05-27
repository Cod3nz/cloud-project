var map = L.map('map').setView([51.19073213658842, 4.3795837970640354], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var myIcon = L.icon({
    iconUrl: '../assets/icons/pizza.png',
    iconSize:     [38, 50], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -86] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([51.19073213658842, 4.3795837970640354], {icon: myIcon}).addTo(map);

marker.bindPopup("<b>Dit is onze locatie,</b><br>kom dansen met ons!").openPopup();