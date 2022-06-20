import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import fetchCard from './API-service';
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
let searchQuery = '';
let currentPage = 1;
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

async function onSearch(e) {
  try {
    e.preventDefault();
    btnShow();
    const searchQuery = e.currentTarget.elements.searchQuery.value;
    clear();
    const result = await fetchCard(searchQuery, currentPage);
    handleResult(result);
  } catch (error) {
    console.log(error);
  }
}

async function onLoadMore() {
  const result = await fetchCard(searchQuery, ++currentPage);
  handleResult(result);
}

function handleResult(result) {
  let totalHits = result.totalHits;
  const cards = result.hits;
  totalElements += cards.length;
  if (totalHits === 0) {
    btnHide();
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  if (totalElements >= totalHits) {
    btnHide();
    return Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }

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
        <a class="gallery" href ="${largeImageURL}"  onclick="event.preventDefault()">
  <img class="gallery" src="${webformatURL}" alt="${tags}" loading="lazy" width=200px/>
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
  lightbox.refresh();
}

function btnShow() {
  loadMoreBtn.classList.remove('is-hidden');
}
function btnHide() {
  loadMoreBtn.classList.add('is-hidden');
}
const lightbox = new SimpleLightbox('.gallery .photo-card a', {
  captionDelay: 250,
});
