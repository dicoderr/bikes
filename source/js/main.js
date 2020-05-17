'use strict';
var burger = document.querySelector('.navbar__burger');
var navbar = document.querySelector('.navbar');
var menuLinks = document.querySelectorAll('.navbar__menu-link');

if (burger && navbar) {
  burger.addEventListener('click', function () {
    navbar.classList.toggle('shown');
  });
}

Array.prototype.slice.call(menuLinks).forEach(function (link) {
  link.addEventListener('click', function () {
    navbar.classList.remove('shown');
  });
});

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

var cleave = new Cleave('.header__form input[type=tel]', {
  phone: true,
  phoneRegionCode: 'RU',
});

ymaps.ready(init);
