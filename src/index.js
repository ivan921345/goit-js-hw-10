//imports
import axios from 'axios';
import { fetchBreeds } from './cat-api';
import { createSelectMarkup } from './markup-functions';
import { getCatImage } from './cat-api';
import { createCatInfoMarkup } from './markup-functions';
import './sass/index.scss';
//varables
const URL_KEY =
  'live_tjMef7tBvYiXiEFcHGpsK4SMgB4edwdiLxUZI34YgCmktcfrwrkTG5BC4d2jC6I0';
const BASE_BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BASE_SEARCH_URL = 'https://api.thecatapi.com/v1/images/search';
const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
};
//set headers
axios.defaults.headers.common['x-api-key'] = URL_KEY;

//  hiding error and loading text
refs.loader.classList.add('hideLoader');
//fetch to set select options
fetchBreeds(BASE_BREEDS_URL).then(catArray => {
  refs.select.insertAdjacentHTML('beforeend', createSelectMarkup(catArray));
});

async function onSelectChange(e) {
  refs.loader.classList.remove('hideLoader');
  const catId = e.currentTarget.value;
  const catImage = await getCatImage(`${BASE_SEARCH_URL}?breed_ids=${catId}`);
  const catArray = await fetchBreeds(BASE_BREEDS_URL);
  const {
    temperament,
    name: catName,
    description,
  } = catArray.find(cat => cat.id === catId);
  refs.loader.classList.add('hideLoader');
  refs.catInfo.innerHTML = createCatInfoMarkup({
    catImage,
    temperament,
    catName,
    description,
  });
}

refs.select.addEventListener('change', onSelectChange);
