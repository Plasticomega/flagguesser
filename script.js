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
            const countryCode = country[0]
            const listOfCountries = countries.map(([code,name]) =>
             name.toLowerCase()
            );  
            displayCountryFlag(countryCode)
            console.log(countryName)
            submitBtn.addEventListener('click',()=>{checkAnswer(countryName)})
            
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


function displayCountryFlag(countryCode){
    let img = document.createElement("img");
    img.src = `https://flagcdn.com/${countryCode}.svg`
    let flag = document.querySelector("#flag")
    flag.appendChild(img)
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
