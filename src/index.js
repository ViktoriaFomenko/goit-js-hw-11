import fetchCard from './API-service';
const searchForm = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryList = document.querySelector('.gallery');
let searchQuery = '';
let page = 1;

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  const searchQuery = e.currentTarget.elements.searchQuery.value;
  galleryList.innerHTML = '';

  fetchCard(searchQuery).then(renderCard);
  // .catch(error => {
  //   alert(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // });
}

function onLoadMore() {
  fetchCard(searchQuery);
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
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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