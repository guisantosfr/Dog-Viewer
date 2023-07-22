const LIST_URL = 'https://dog.ceo/api/breeds/list/all';

const selectElement = document.querySelector('.breeds');
const dogImage = document.querySelector('.dog-img');
const spinnerElement = document.querySelector('.spinner');

fetch(LIST_URL)
  .then(response => response.json())
  .then(data => {
    const breedsArray = Object.keys(data.message);
    fillOptions(breedsArray);
  });

selectElement.addEventListener('change', e => {
  const breed = e.target.value.toLowerCase();

  getDogImage(`https://dog.ceo/api/breed/${breed}/images/random`)
});

function fillOptions(array) {
  array.forEach(breed => {
    const capitalizedBreedName = breed.replace(/\b\w/g, l => l.toUpperCase());

    const optionElement = document.createElement('option');
    optionElement.innerHTML = `<option value=${breed}>${capitalizedBreedName}</option>`;

    selectElement.appendChild(optionElement);
  });
}

function getDogImage(url) {
  fetch(url) //busca imagem aleatoria na api
    .then(response => response.json())
    .then(img => {
      spinnerElement.classList.add('show');
      dogImage.classList.remove('show');

      dogImage.src = img.message;
    });

  dogImage.addEventListener('load', () => {
    spinnerElement.classList.remove('show');
    dogImage.classList.add('show');
  });
}

function fetchInitialImage() {
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.message;
      const imgElement = document.querySelector('.dog-img');
      imgElement.src = imageUrl;
    })
    .catch(error => {
      console.error('Error fetching image data:', error);
    });
}

document.addEventListener('DOMContentLoaded', fetchInitialImage);