import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchCard from './API-service';
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
let searchQuery = '';
let currentPage;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);
btnHide();

function onSearch(e) {
  e.preventDefault();
  btnShow();
  const searchQuery = e.currentTarget.elements.searchQuery.value;

  // if () {
  //   return Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }
  galleryList.innerHTML = '';

  currentPage = 1;
  fetchCard(searchQuery, currentPage).then(renderCard);
}

function onLoadMore() {
  fetchCard(searchQuery, currentPage++).then(renderCard);

  // if () {
  //   return Notify.failure(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  // }
  // btnHide();
}

function renderCard(card) {
  const markup = card
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
