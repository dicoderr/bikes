'use strict';
var burger = document.querySelector('.navbar__burger');
var navbar = document.querySelector('.navbar');

burger.addEventListener('click', function () {
  navbar.classList.toggle('shown');
});

var map; // eslint-disable-line

function init() {
  map = new ymaps.Map('map', {
    center: [59.938635, 30.323118],
    zoom: 15,
    controls: []
  });
}

ymaps.ready(init);
