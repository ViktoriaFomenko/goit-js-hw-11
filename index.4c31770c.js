!function(){function n(n){var e="https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=".concat(n,"&image_type=photo&orientation=horizontal&safesearch=true&per_page=40");return fetch(e).then((function(n){return n.json()}))}var e=document.querySelector(".search-form"),t=document.querySelector(".load-more"),a=document.querySelector(".gallery");function c(n){var e=n.map((function(n){var e=n.webformatURL,t=(n.largeImageURL,n.tags),a=n.likes,c=n.views,o=n.comments,r=n.downloads;return'<div class="photo-card">\n  <img src="'.concat(e,'" alt="').concat(t,'" loading="lazy" />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes: ').concat(a,'</b>\n    </p>\n    <p class="info-item">\n      <b>Views: ').concat(c,'</b>\n    </p>\n    <p class="info-item">\n      <b>Comments: ').concat(o,'</b>\n    </p>\n    <p class="info-item">\n      <b>Downloads: ').concat(r,"</b>\n    </p>\n  </div>\n</div>")})).join("");a.insertAdjacentHTML("beforeend",e)}e.addEventListener("submit",(function(e){e.preventDefault();var t=e.currentTarget.elements.searchQuery.value;a.innerHTML="",n(t).then(c).catch((function(n){alert("Sorry, there are no images matching your search query. Please try again.")}))})),t.addEventListener("click",(function(){n("")}))}();
//# sourceMappingURL=index.4c31770c.js.map
