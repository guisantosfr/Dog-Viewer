const LIST_URL = 'https://dog.ceo/api/breeds/list/all';

const selectElement = document.querySelector('.breeds');
const selectSubBreedElement = document.querySelector('.sub-breeds');
const dogImage = document.querySelector('.dog-img');
const spinnerElement = document.querySelector('.spinner');
let listAllBreeds = null;
let breedSelected = null;
let hasSubBreedSelected = false;

fetch(LIST_URL) //retorna uma promise contendo a resposta (objeto Response)
  .then(response => response.json()) //extrai o corpo JSON da resposta
  .then(data => {
    const breedsArray = Object.keys(data.message); //obtem as chaves do objeto
    fillOptions(breedsArray, selectElement);
    listAllBreeds = data.message;
  });

selectElement.addEventListener('change', e => {
  const breed = e.target.value.toLowerCase(); //obtem a opção atual do select
  hasSubBreedSelected = false;
  breedSelected = breed;

  getDogImage(`https://dog.ceo/api/breed/${breed}/images/random`, breed)
});

selectSubBreedElement.addEventListener('change', e => {
  const breed = e.target.value.toLowerCase();
  hasSubBreedSelected = true;

  getDogImage(`https://dog.ceo/api/breed/${breedSelected}/${breed}/images/random`)
});

function fillOptions(options, element) {
  element.replaceChildren();

  options.forEach(breed => {
    const [firstLetter, ...rest] = breed;
    const capitalizedBreedName = firstLetter.toUpperCase() + rest.join('').toLowerCase();

    const optionElement = document.createElement('option');
    optionElement.innerHTML = `<option value=${breed}>${capitalizedBreedName}</option>`;

    element.appendChild(optionElement);
  });
}

function displaySubBreeds() {
  if (!listAllBreeds[breedSelected].length) {
    return selectSubBreedElement.parentNode.classList.remove('show');
  }

  selectSubBreedElement.parentNode.classList.add('show');
  fillOptions(listAllBreeds[breedSelected], selectSubBreedElement);
}

function getDogImage(url) {
  fetch(url) //busca imagem aleatoria na api
    .then(response => response.json())
    .then(img => {
      hasSubBreedSelected ? null : displaySubBreeds();
      spinnerElement.classList.add('show');
      dogImage.classList.remove('show');

      dogImage.src = img.message;
    });

  dogImage.addEventListener('load', () => {
    spinnerElement.classList.remove('show');
    dogImage.classList.add('show');
  });
}
