import axios from 'axios';

// export default function fetchCard(searchQuery, page) {
//   const URL = `https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
//   return fetch(URL).then(response => {
//     return response.json();
//   });
// }
export default async function fetchCard(searchQuery, page) {
  const URL = `https://pixabay.com/api/?key=28071781-459ddb4c5fc455b50beadddbb&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const response = await axios.get(URL);
  console.log(response);
  return response.data.hits;
}
