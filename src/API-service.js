export default function fetchCard(searchQuery) {
  const URL = `https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=1`;
  return fetch(URL).then(response => {
    return response.json();
  });
}
