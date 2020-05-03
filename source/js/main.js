'use strict';
var burger = document.querySelector('.navbar__burger');
var navbar = document.querySelector('.navbar');

if (burger && navbar) {
  burger.addEventListener('click', function () {
    navbar.classList.toggle('shown');
  });
}

function init() {
  var map = document.getElementById('map');
  if (!map) {
    return null;
  }
  var lat = +map.dataset.lat;
  var lng = +map.dataset.lng;
  return new ymaps.Map('map', {
    center: [lat, lng],
    zoom: 15,
    controls: []
  });
}

ymaps.ready(init);