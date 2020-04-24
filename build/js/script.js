'use strict';
var burger = document.querySelector('.navbar__burger');
var navbar = document.querySelector('.navbar');

burger.addEventListener('click', function () {
  navbar.classList.toggle('shown');
});
