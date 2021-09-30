var accessForm = document.querySelector('#main-form');
var $views = document.querySelectorAll('.view');
var $favs = document.querySelector('.favs');
var $about = document.querySelector('.about');
var $logo = document.querySelector('.logo');
var $favsHeart = document.getElementById('addtofav');
var $home = document.querySelector('.homepagebtn');
var $home2 = document.querySelector('.homepagebtn2');
var $home3 = document.querySelector('.homepagebtn3');
var imageUrl;
var wineTitle;

function getWine(event) {
  event.preventDefault();
  var winerec = document.querySelector('#winerec');
  var wineImage = document.querySelector('#wine-image');
  winerec.innerHTML = '';
  wineImage.innerHTML = '';

  var xhr = new XMLHttpRequest();
  var url = 'https://api.spoonacular.com/food/wine/pairing';
  var delimiter = '&';
  var foodParam = 'food=' + accessForm.elements.food.value;
  var maxPriceParam = 'maxPrice=' + accessForm.elements.price.value;
  var apiKey = 'apiKey=813583d5fed0439d9bc095ff4b5c0ac4';
  var requestPath = url + '?' + foodParam + delimiter + maxPriceParam + delimiter + apiKey;

  xhr.open('GET', requestPath);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.response.pairingText !== '') {
      var newEl = document.createElement('h3');
      var newText = document.createTextNode(xhr.response.pairingText);
      newEl.appendChild(newText);
      winerec.appendChild(newEl);
      var newImage = document.createElement('img');
      imageUrl = xhr.response.productMatches[0].imageUrl;
      wineTitle = xhr.response.productMatches[0].title;
      newImage.setAttribute('src', imageUrl);
      wineImage.appendChild(newImage);
      $favsHeart.className = 'view';
    } else {
      var newBadEl = document.createElement('h3');
      var newBadText = document.createTextNode('No matches were found. Please try again.');
      newBadEl.appendChild(newBadText);
      winerec.appendChild(newBadEl);
      $favsHeart.className = 'view hidden';
    }
  });
  xhr.send();
  viewRecs(event);
  document.querySelector('#main-form').reset();
}
accessForm.addEventListener('submit', getWine);

function viewPage(pageName) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === pageName) {
      $views[i].className = 'view';
    } else {
      $views[i].className = 'view hidden';
    }
  }
}

function viewRecs(event) {
  viewPage('rec-page');
}

function viewFavs(event) {
  viewPage('favorite-page');
}
$favs.addEventListener('click', viewFavs);

function viewAbout(event) {
  viewPage('about-page');
}
$about.addEventListener('click', viewAbout);

function viewLandingPage(event) {
  viewPage('landing-page');
}
$logo.addEventListener('click', viewLandingPage);
$favsHeart.addEventListener('click', addToFavs);
$home.addEventListener('click', viewLandingPage);
$home2.addEventListener('click', viewLandingPage);
$home3.addEventListener('click', viewLandingPage);
// adding to favorites //
function addToFavs(event) {
  event.preventDefault();
  var favEntry = {
    title: wineTitle,
    imageUrl: imageUrl
  };
  data.entries.unshift(favEntry);
}

function insertContent(entry) {
  var $LI = document.createElement('li');
  $LI.setAttribute('class', 'content');

  var $title = document.createElement('h3');
  $title.setAttribute('class', 'nameOfFavWine');
  $title.textContent = entry.title;

  var $image = document.createElement('img');
  $image.setAttribute('class', 'picOfFavWine');
  $image.setAttribute('src', entry.imageUrl);

  $LI.appendChild($title);
  $LI.appendChild($image);

  return $LI;
}

var $newLI = document.querySelector('ul');
for (var i = 0; i < data.entries.length; i++) {
  var $entry = insertContent(data.entries[i]);
  $newLI.appendChild($entry);
}
// modal stuff //
var modal = document.querySelector('.modal');

function toggleModal() {
  modal.classList.toggle('show-modal');
}

function windowOnClick(event) {
  if (event.target === modal) {
    toggleModal();
  }
}

$favsHeart.addEventListener('click', toggleModal);
window.addEventListener('click', windowOnClick);
