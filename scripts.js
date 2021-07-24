const LIST_URL = 'https://dog.ceo/api/breeds/list/all';

const selectElement = document.querySelector('.breeds');
const dogImage = document.querySelector('.dog-img');
const spinnerElement = document.querySelector('.spinner');

fetch(LIST_URL) //retorna uma promise contendo a resposta (objeto Response)
  .then(response => response.json()) //extrai o corpo JSON da resposta
  .then(data => {
    const breedsArray = Object.keys(data.message); //obtem as chaves do objeto
    fillOptions(breedsArray);
  });

selectElement.addEventListener('change', e => {
  const breed = e.target.value.toLowerCase(); //obtem a opção atual do select

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
