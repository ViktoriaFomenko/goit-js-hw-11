export default function fetchCard(searchQuery) {
  const url = `https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;
  return fetch(url).then(response => {
    return response.json();
  });
}
