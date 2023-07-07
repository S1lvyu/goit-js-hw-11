'use strict';
import Notiflix from 'notiflix';
function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}

function createHtmlMarkup(data) {
  const markup = data
    .map(element => {
      return `<div class="photo-card">
  <a href="${element.largeImageURL}"> <img class="image" src="${element.webformatURL}" alt="${element.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info__item">
      <b class="info__item-title">Likes</b><span class="info__item-content">${element.likes}</span>
    </p>
    <p class="info__item">
      <b class="info__item-title">Views</b><span class="info__item-content">${element.views}</span>
    </p>
    <p class="info__item">
      <b class="info__item-title">Comments</b><span class="info__item-content">${element.comments}</span>
    </p>
    <p class="info__item">
      <b class="info__item-title">Downloads</b><span class="info__item-content">${element.downloads}</span>
    </p>
  </div>
</div>`;
    })
    .join('');
  return markup;
}
function disableBtn(loadMoreBtn) {
  loadMoreBtn.classList.add('hidden');
}
function enableBtn(loadMoreBtn) {
  loadMoreBtn.classList.remove('hidden');
}
function incrementPage(params) {
  params.page += 1;
}
function resetPage(params) {
  params.page = 1;
}
function onErrorNoMatches() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onErrorEndOfResults() {
  Notiflix.Notify.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
function getAPIUrl(api, params) {
  const url = new URL(api);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return url.toString();
}
export {
  smoothScroll,
  createHtmlMarkup,
  disableBtn,
  enableBtn,
  incrementPage,
  resetPage,
  onErrorNoMatches,
  onErrorEndOfResults,
  getAPIUrl,
};
