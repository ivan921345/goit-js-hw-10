import './sass/index.scss';
import axios, { all } from 'axios';
import { fetchCats } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  load: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

const API_KEY =
  'live_m3flvUNu2m5ZaHIeTWEpIpI8dOyDkrqfIHnCMa85KfeF4Q2fZvGbdlcv0cvx1Jju';
const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
const FULL_CAT_INFO_URL = 'https://api.thecatapi.com/v1/images/search';

axios.defaults.headers.common['x-api-key'] = `${API_KEY}`;

refs.errorEl.classList.add('hideError');
refs.load.classList.add('hideLoader');

function renderOptions(arr) {
  return arr
    .map(
      cat => `
    <option value="${cat.id}">
		${cat.name}
    </option>`
    )
    .join('');
}

function createCatImage(objWithImage, objWithInfo) {
  return `<img src="${objWithImage[0].url}" alt="${objWithInfo.name}"/>`;
}

function createCatInfo(objWithInfo) {
  return `
		<h2>
		${objWithInfo.name}
	</h2>
	<p>
		${objWithInfo.description}
	</p>
	<h3>
		Temperament:
	</h3>
	<p>
		${objWithInfo.temperament}
	</p>
	`;
}

fetchCats(`${BASE_URL}`)
  .then(data => {
    console.log(data);
    refs.select.innerHTML = renderOptions(data);
  })
  .catch(err => {
    console.log(err);
  });

refs.select.addEventListener('change', onChange);

function onChange(e) {
  refs.catInfoEl.innerHTML = '';

  refs.select.classList.add('hideSelect');
  refs.load.classList.remove('hideLoader');
  fetchCats(`${BASE_URL}`)
    .then(allCats => {
      refs.select.classList.remove('hideSelect');
      refs.load.classList.add('hideLoader');
      fetchCatByBreed(FULL_CAT_INFO_URL, e.target.value)
        .then(catById => {
          refs.catInfoEl.insertAdjacentHTML(
            'beforeend',
            createCatImage(
              catById,
              allCats.find(cat => cat.id === e.target.value)
            )
          );
        })
        .catch(err => {
          refs.errorEl.classList.remove('hideError');
        });

      setTimeout(() => {
        refs.catInfoEl.insertAdjacentHTML(
          'beforeend',
          createCatInfo(allCats.find(cat => cat.id === e.target.value))
        );
      }, 250);
    })
    .catch(err => {
      refs.errorEl.classList.remove('hideError');
    });
}
