class Country implements Country {
  //object Country that match the database attribute
  name: string;
  alpha2Code: string;
  flag: string;
  nativeName: string;
  capital: string;
  population: number;
  languages: Array<Map<string, string>>;
  timezones: Array<string>;
  currencies: string;
  borders: string;

  constructor(
    //constructor to associate object attributes to attributes of the instances of the database
    name: string,
    alpha2Code: string,
    flag: string,
    nativeName: string,
    capital: string,
    population: number,
    languages: Array<Map<string, string>>,
    timezones: Array<string>,
    currencies: string,
    borders: string
  ) {
    this.name = name;
    this.alpha2Code = alpha2Code;
    this.flag = flag;
    this.nativeName = nativeName;
    this.capital = capital;
    this.population = population;
    this.languages = languages;
    this.timezones = timezones;
    this.currencies = currencies;
    this.borders = borders;
  }
}

function getCountries(): Promise<Country[]> {
  // we are gonna get the data stored on the rest api
  return (
    fetch("https://restcountries.eu/rest/v2/all")
      // the JSON body is taken from the response
      .then((res) => res.json())
      .then((res) => {
        // The response has an 'any' type, so we need to cast
        // it to the 'Country' type, and return it from the promise
        return res as Country[];
      })
  );
}

function chop(n: number, str: string) {
  //function to chop chunks of the names of countries that could be the researched country
  let chopped: string[] = [];
  for (let i = 1; i < str.length + 1; i++) {
    //we go through the string
    chopped.push(str.substring(i, i + n)); //we put every chunks of the size n of the input that are in the string
  }
  return chopped;
}

function buildList(input: string) {
  //function that will build the list of resulting countries according to the input submitted
  //we get the data from the rest api and we convert it into a list of 'Country' objects
  getCountries().then((countries) => {
    var list = document.getElementById("list"); //we store the parent element of the list in a variable called list
    alert("voila l'input" + input);
    for (let i: number = 0; i < countries.length; i++) {
      //we go through all the countries in the database (here the list of 'Country' objects)
      if (
        input.toLowerCase() in
        chop(input.length, countries[i].name.toLowerCase())
      ) {
        //if a chunk of the name of the country is equal to the input then we create a 'li' element that will be part of the resulting list
        var item = document.createElement("li");
        //this element will hold a text with the name and ISO 3166-1 Code of the country
        item.innerHTML = countries[i].name + " : " + countries[i].alpha2Code;
        item.appendChild(document.createTextNode("Item " + i.toString));
        list.appendChild(item);
      }
    }
  });
}
var input = <HTMLInputElement>document.getElementById("searchCountry");
buildList(input.value);
