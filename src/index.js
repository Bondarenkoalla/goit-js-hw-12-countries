
import './sass/main.scss';
import fetchCountries from './fetchCountries';
import countryHbs from './templates/country.hbs';
import listHbs from './templates/list.hbs';
import debounce from 'lodash.debounce';
const refs = {
  searchInput: document.querySelector('.input'),
  cotainer: document.querySelector('.container-js'),
};

import {error} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css'
import '@pnotify/core/dist/BrightTheme.css'
function toManyMatches() {
  error({
    text: 'To many matches found. Please enter a more specific query!',
    delay: 1500,
  })
};
function countryNotFound() {
  error({
    text: 'Country not found!',
    delay: 1500,
  });
}
refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {  
  const searchQuery = e.target.value.trim();
  refs.cotainer.innerHTML = ' ';
  if (searchQuery.length < 1) {
    return
  };
  // if (searchQuery === " "|| searchQuery === "  "||searchQuery === "   ") { return };
  fetchCountries(searchQuery)
    .then(countryShow);    ;
}


const countryShow = countries => {
  
  
    if (countries.length === 0) { countryNotFound() };
    if (countries.length > 10) { toManyMatches() };
    if (countries.status === 404) { countryNotFound() };
    if (countries.length > 1 && countries.length < 10) { refs.cotainer.innerHTML = listHbs(countries) };
    if (countries.length === 1) { refs.cotainer.innerHTML = countryHbs(countries) };
  
  
  
}

