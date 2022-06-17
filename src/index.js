import { Notify } from 'notiflix/build/notiflix-notify-aio';
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
}

function renderCard({ hits }) {
  const markup = hits
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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=150px/>
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
function btnShow() {
  loadMoreBtn.classList.remove('is-hidden');
}
function btnHide() {
  loadMoreBtn.classList.add('is-hidden');
}
