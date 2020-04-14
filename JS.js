fetch('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    
    console.log(data);
    console.log("Hi \n worl")

    pageRender(data);
            
  });

function pageRender(data){
  for (i = 0 ; i< 250 ; i++){
    var code, flag, country, showFlag, name, showName, capital, countryCode, showMore, showMoreText, popup;

    code = data[i].alpha3Code.toLowerCase();
    flag = "https://restcountries.eu/data/" + code + ".svg";
    name = data[i].name;
    capital = data[i].capital;
    countryCode = data[i].callingCodes[0];

    country = document.createElement('div');
    country.setAttribute('class', 'country');
    country.setAttribute('id', 'country-' + i);
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
}

function togglePopup(popup, showMoreText, data){
  var textId, i, population, region, currency, textArray, remove;
  textId = event.srcElement.id;
  textArray = textId.split('-');
  i = textArray[1];
  
  population = data[i].population;
  region = data[i].region;
  currency = data[i].currencies[0].name;

  console.log(population);

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

