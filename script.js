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
            console.log(countryName)
            submitBtn.addEventListener('click',()=>{checkAnswer(countryName)})
            
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
            }
            )

        .catch(error => console.error('Failed to fetch data:', error)); 
        }
        fetchJSONData();  


function getRandomCountry(countries){
    return countries[Math.floor((Math.random()*countries.length))]
}

const submitBtn = document.querySelector(".submitBtn")
const answer = document.querySelector(".answer")

function checkAnswer(countryName){
    let currentAns = answer.value
    if(currentAns === countryName){
        console.log("you won!!!")
    }else(console.log("try again!!"))
}

