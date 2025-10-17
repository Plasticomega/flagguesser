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
        opt.slice(0, inputValue.length).toLowerCase() === inputValue.toLowerCase()
    );
    return filteredOptions;
}

function displayOptions(filteredOptions){
    suggestions.innerHTML = '';
    if(answer.value != ''){
    filteredOptions.forEach(option => {
    const word = document.createElement("div");
    word.textContent = option 
    suggestions.appendChild(word)
    word.addEventListener('click',()=>{
        answer.value = word.textContent;
        suggestions.innerHTML = ''                                    
    })
})};
}
