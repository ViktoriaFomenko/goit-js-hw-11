import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchCard from './API-service';
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
let searchQuery = '';
let currentPage;
let totalElements;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
btnHide();

function clear() {
  galleryList.innerHTML = '';
  currentPage = 1;
  totalElements = 0;
  btnShow();
}

function onSearch(e) {
  e.preventDefault();
  btnShow();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  clear();
  fetchCard(searchQuery, currentPage).then(handleResult);
}

function onLoadMore() {
  fetchCard(searchQuery, currentPage++).then(handleResult);
}

function handleResult(result) {
  let totalHits = result.totalHits;
  if (totalHits === 0) {
    btnHide();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (totalElements >= result.totalHits) {
    btnHide();
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
  cards = result.hits;
  totalElements += cards.length;
  renderCard(cards);
}

function renderCard(cards) {
  const markup = cards
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href ="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=150px/>
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
}

const lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });

function btnShow() {
  loadMoreBtn.classList.remove('is-hidden');
}
function btnHide() {
  loadMoreBtn.classList.add('is-hidden');
}
