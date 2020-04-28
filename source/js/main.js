'use strict';
var burger = document.querySelector('.navbar__burger');
var navbar = document.querySelector('.navbar');

if (burger) {
  burger.addEventListener('click', function () {
    if (navbar) {
      navbar.classList.toggle('shown');
    }
  });
}

function init() {
  return new ymaps.Map('map', {
    center: [59.938635, 30.323118],
    zoom: 15,
    controls: []
  });
}

ymaps.ready(init);
