'use strict';
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
  getAPIUrl,
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

async function getContent() {
  try {
    const response = await fetch(getAPIUrl(API, params));
    const data = await response.json();
    const hits = data.hits;
    const totalHits = data.totalHits;
    const pages = Math.ceil(totalHits / params.per_page);

    if (hits.length > 1 && params.page === 1) {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
    if (hits.length === 0) {
      gallery.innerHTML = '';
      onErrorNoMatches();
      disableBtn(loadMoreBtn);
    } else {
      markup += await createHtmlMarkup(hits);
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
    Notiflix.Notify.failure('Sorry, you have to write something');
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

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', loadMore);
jumpToStartBtn.addEventListener('click', jumpToStart);
jumpToEndBtn.addEventListener('click', jumpToEnd);
