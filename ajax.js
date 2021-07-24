const LIST_URL = 'https://dog.ceo/api/breeds/list/all';

const selectElement = document.querySelector('.breeds');
const dogImage = document.querySelector('.dog-img');
const spinnerElement = document.querySelector('.spinner');

const request1 = new XMLHttpRequest();

request1.onreadystatechange = () => {
  if (request1.readyState == 4 && request1.status == 200) {
    const breedsList = JSON.parse(request1.responseText).message;
    const breedsArray = Object.keys(breedsList);

    fillOptions(breedsArray);
  }
}

selectElement.addEventListener('change', e => {
  const breed = e.target.value.toLowerCase(); //obtem a opção atual do select

  getDogImage(`https://dog.ceo/api/breed/${breed}/images/random`);
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
  const request2 = new XMLHttpRequest();

  request2.onload = () => {
    if (request2.readyState == 4 && request2.status == 200) {
      const imgUrl = JSON.parse(request2.responseText);
      spinnerElement.classList.add('show');
      dogImage.classList.remove('show');

      dogImage.src = imgUrl.message;
    }
  }

  dogImage.addEventListener('load', () => {
    spinnerElement.classList.remove('show');
    dogImage.classList.add('show');
  });

  request2.open('GET', url);
  request2.send();
}

request1.open('GET', LIST_URL);
request1.send();
