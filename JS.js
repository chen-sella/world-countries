fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    pageRender(data);  
    console.log(typeof(data));
  });

function pageRender(data){
  var nameArr = [];
  for (i = 0 ; i< data.length ; i++){
    var code, flag, country, showFlag, name, showName, capital, countryCode, showMore, showMoreText, popup;

    code = data[i].alpha3Code.toLowerCase();
    flag = "https://restcountries.eu/data/" + code + ".svg";
    name = data[i].name;
    nameArr.push(name);
    capital = data[i].capital;
    countryCode = data[i].callingCodes[0];

    country = document.createElement('div');
    country.setAttribute('class', 'country');
    country.setAttribute('id', 'country-' + i);
    country.setAttribute('name', name.toLowerCase());
    document.querySelector('.countries').appendChild(country);

    showFlag = document.createElement('img');
    showFlag.setAttribute('src', flag);
    showFlag.setAttribute('class', 'flag')
    showFlag.setAttribute('id', 'flag' + i);
    document.querySelector('#country-'+i).appendChild(showFlag);

    showName = document.createElement('pre');
    showName.setAttribute('class', 'names');
    showName.textContent = "Country Name: " + name + "\n" + "Capital City: " + capital + "\n" + "Country Code: " + countryCode;
    document.querySelector('#country-'+i).appendChild(showName);

    showMore = document.createElement('button');
    showMore.setAttribute('class', 'btn');
    showMore.setAttribute('id', 'btn-'+i);
    showMore.textContent = 'Show more';
    document.querySelector('#country-'+i).appendChild(showMore);

    popup = document.querySelector('.popup');
    showMore.addEventListener('click',() => togglePopup(popup, showMoreText, data));
  }

  var search;   
  search = document.createElement('input');
  search.setAttribute('class', 'searchBox');
  search.setAttribute('placeholder', 'Insert Country Name');
  document.querySelector('.search').appendChild(search);
  
  search.addEventListener('keyup',() =>  debounce(searchBox(event, data),2000));
}

function togglePopup(popup, showMoreText, data){
  var textId, i, population, region, currency, textArray, remove;
  textId = event.srcElement.id;
  textArray = textId.split('-');
  i = textArray[1];
  
  population = data[i].population;
  region = data[i].region;
  currency = data[i].currencies[0].name;

  showMoreText = document.createElement('pre');
  showMoreText.setAttribute('class', 'moreText');
  showMoreText.textContent = "Region: "+region + '\n' + "Population: " + population + '\n' + "Currency: " + currency;
  document.querySelector('.popup').appendChild(showMoreText);

  remove = document.createElement('button');
  remove.setAttribute('class', 'remove');
  remove.textContent = 'X';
  document.querySelector('.popup').appendChild(remove);

  remove.addEventListener('click', function(e){
    showMoreText.parentNode.removeChild(showMoreText);
    remove.parentNode.removeChild(remove);
  })
}

function searchBox(event, data){
  var inputValue, sliced, countryName, deleteCountry, deleteList, key;

  key = event.keyCode;
  console.log(key);
  inputValue = document.querySelector('.searchBox').value;
  deleteList = [];
  console.log(inputValue);

  if (key == 8){
    console.log('Hi');
    pageRender(deleteList);
  }
  else{
    for (i = 0 ; i<data.length ; i++){
      countryName = data[i].name.toLowerCase();
      sliced = countryName.slice(0, inputValue.length);
      deleteCountry = document.querySelector('#country-'+i);
      
    
      if (inputValue != sliced){
        if (deleteCountry != null){
          deleteList.push(data[i]);
          deleteCountry.parentNode.removeChild(deleteCountry);
        }
      }
    }
      
      console.log(deleteList);
      console.log(typeof(deleteList));
  }

  }
  


function debounce(fn, duration) {
  var timer;
  return function(){
    clearTimeout(timer);
    timer = setTimeout(fn, duration);
  }
}
