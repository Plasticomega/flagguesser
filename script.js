function fetchJSONData() {
    fetch('./flags.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();  
        })
        .then(data => 
            {const countries = Object.entries(data)
            const country = getRandomCountry(countries)
            const countryName = country[1].toLowerCase()
            foo.country = countryName
            const countryCode = country[0]
            const listOfCountries = countries.map(([code,name]) =>
             name.toLowerCase()
            );  
            console.log(countryName)
            displayCountryFlag(countryCode)
            submitBtn.addEventListener('click',()=>{checkAnswer(countryName);
              fetchJSON(); 
            })
            
            answer.addEventListener('input', () => {
                const filteredOptions = autoComplete(answer.value, listOfCountries);
                displayOptions(filteredOptions)
            });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            }
            )

        .catch(error => console.error('Failed to fetch data:', error)); 
        }
        fetchJSONData();  


function getRandomCountry(countries){
    return countries[Math.floor((Math.random()*countries.length))]
}

function displayCountryFlag(countryCode) {
    const flag = document.querySelector("#flag");
    flag.innerHTML = ""; 

    const img = new Image();
    img.style.opacity = 0; 
    img.src = `https://flagcdn.com/${countryCode}.svg`;

    img.onload = () => {
        img.style.transition = "opacity 0.3s ease-in-out";
        img.style.opacity = 1; 
    };

    flag.appendChild(img);
}


const submitBtn = document.querySelector(".submitBtn")
const answer = document.querySelector(".answer")

function checkAnswer(countryName){
    let currentAns = answer.value
    if(currentAns === countryName){
        console.log("you won!!!")
    }else(console.log("try again!!"))
}


const suggestions = document.querySelector(".suggestions")
answer.value = ''


function autoComplete(inputValue, options) {
    const filteredOptions = options.filter(opt => 
        opt.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    return filteredOptions;
}

function displayOptions(filteredOptions) {
  suggestions.innerHTML = '';
  if (answer.value !== '') {
    const query = answer.value.toLowerCase();
    filteredOptions.forEach(option => {
      const div = document.createElement("div");
      const lowerOpt = option.toLowerCase();
      const index = lowerOpt.indexOf(query);
      if (index !== -1) {
        div.innerHTML =
          option.substring(0, index) +
          "<strong>" + option.substring(index, index + query.length) + "</strong>" +
          option.substring(index + query.length);
      } else {
        div.textContent = option;
      }
      suggestions.appendChild(div);
      div.addEventListener('click', () => {
        answer.value = option;
        suggestions.innerHTML = '';
      });
    });
  }
}

let foo = {}

function fetchJSON() {
      fetch('./countries.json')
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();  
          })
          .then(data => 
              {
                let Destinationcountry = foo.country
                let Guessedcountry = answer.value.toLowerCase()
                let distance = calculateDistance(data[Destinationcountry].lat,data[Destinationcountry].lon,data[Guessedcountry].lat,data[Guessedcountry].lon)
                let bearing = calculateBearing(data[Guessedcountry].lat,data[Guessedcountry].lon,data[Destinationcountry].lat,data[Destinationcountry].lon)
                console.log(bearing)
                let direction = bearingToCompass(bearing)
                console.log(`distance between ${Destinationcountry} and ${Guessedcountry} is ${distance}kms in direction ${direction}`)
              }
              )

          .catch(error => console.error('Failed to fetch data:', error)); 
          }



function calculateDistance(lat1,long1,lat2,long2){
  const R = 6371e3;
  const radianconvert = Math.PI/180
  lat1 = lat1 * radianconvert
  lat2 = lat2 * radianconvert
  long1 = long1 * radianconvert
  long2 = long2 * radianconvert
  const a = Math.sin((lat2 - lat1)/2) * Math.sin((lat2 - lat1)/2) + (Math.cos(lat1)) * Math.cos(lat2) * (Math.sin((long2-long1)/2)*Math.sin((long2-long1)/2))
  const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a))
  const d = R * c
  return Math.floor(d/1000)
}

function calculateBearing(lat1,long1,lat2,long2){
const radianconvert = Math.PI/180
lat1 = lat1 * radianconvert
lat2 = lat2 * radianconvert
long1 = long1 * radianconvert
long2 = long2 * radianconvert
const y = Math.sin(long2-long1) * Math.cos(lat2);
const x = Math.cos(lat1)*Math.sin(lat2) -
          Math.sin(lat1)*Math.cos(lat2)*Math.cos(long2-long1);
const θ = Math.atan2(y, x);
const brng = (θ*180/Math.PI + 360) % 360;
return brng
}

function bearingToCompass(bearing) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(bearing / 45) % 8;
  return dirs[index]
}