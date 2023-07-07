'use strict';
import axios from 'axios';
import Notiflix from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import {
  smoothScroll,
  createHtmlMarkup,
  disableBtn,
  enableBtn,
  incrementPage,
  resetPage,
  onErrorNoMatches,
  onErrorEndOfResults,
} from './utils';
import { jumpToEnd, jumpToStart } from './scroll-buttons';
const API = 'https://pixabay.com/api/';
const API_KEY = '38102886-045479c2900973c57f82fbd15';
const params = {
  key: API_KEY,
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
};
const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const jumpToStartBtn = document.querySelector('#jump-to-start');
const jumpToEndBtn = document.querySelector('#jump-to-end');
let markup = ``;
delete axios.defaults.headers.common['Permissions-Policy'];
async function getContent() {
  try {
    const response = await axios.get(API, { params });
    const data = await response.data.hits;
    const pages = Math.ceil(response.data.totalHits / params.per_page);
    if (data.length > 1 && params.page === 1) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`
      );
    }
    if (data.length === 0) {
      gallery.innerHTML = '';
      onErrorNoMatches();
      disableBtn(loadMoreBtn);
    } else {
      markup += await createHtmlMarkup(data);
      insertMarkup(markup);

      if (params.page >= pages) {
        onErrorEndOfResults();
        disableBtn(loadMoreBtn);
      }
      smoothScroll();
    }
  } catch (error) {
    console.error(error);
  }
}

function insertMarkup(markup) {
  gallery.innerHTML = markup;

  lightbox = new simpleLightbox('.gallery a');
}

function onSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  params.q = form.elements.searchQuery.value.trim();
  if (!params.q) {
    Notiflix.Notify.failure('Sorry, you have write something');
    form.reset();
    return;
  }
  resetPage(params);
  getContent();
  enableBtn(loadMoreBtn);
  markup = ``;
  form.reset();
}
function loadMore() {
  incrementPage(params);
  getContent();
}
const cookies = document.cookie.split(';');

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);
jumpToStartBtn.addEventListener('click', jumpToStart);
jumpToEndBtn.addEventListener('click', jumpToEnd);
