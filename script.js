function fetchJSONData() {
	fetch('./flags.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			const countries = Object.entries(data)
			const country = getRandomCountry(countries)
			const countryName = country[1].toLowerCase()
			foo.country = countryName
			const countryCode = country[0]
			const listOfCountries = countries.map(([code, name]) =>
				name.toLowerCase()
			);
			console.log(countryName)
			displayCountryFlag(countryCode)
			submitBtn.addEventListener('click', () => {
				fetchJSON().then(result => {
					checkAnswer(countryName, result[0], result[1]);
				})

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

let guess = 0;

function getRandomCountry(countries) {
	return countries[Math.floor((Math.random() * countries.length))]
}


function displayCountryFlag(countryCode) {
	const flag = document.querySelector("#flag");
	flag.innerHTML = "";

	const img = new Image();
	const imgCover = document.createElement('div')

	const imgGrid1 = document.createElement('div');
	const imgGrid2 = document.createElement('div');
	const imgGrid3 = document.createElement('div');
	const imgGrid4 = document.createElement('div');
	const imgGrid5 = document.createElement('div');
	const imgGrid6 = document.createElement('div');

	imgCover.appendChild(imgGrid1)
	imgCover.appendChild(imgGrid2)
	imgCover.appendChild(imgGrid3)
	imgCover.appendChild(imgGrid4)
	imgCover.appendChild(imgGrid5)
	imgCover.appendChild(imgGrid6)

	imgGrid1.classList.add("grid1")
	imgGrid2.classList.add("grid2")
	imgGrid3.classList.add("grid3")
	imgGrid4.classList.add("grid4")
	imgGrid5.classList.add("grid5")
	imgGrid6.classList.add("grid6")

	let grid = [imgGrid1, imgGrid2, imgGrid3, imgGrid4, imgGrid5, imgGrid6]
	imgCover.addEventListener("click", () => {
		let num = grid.length
		let randomcell = Math.floor(Math.random() * num);
		grid[randomcell].hidden = true;
		grid.splice(randomcell, 1)
	})

	imgCover.classList.add('flag-cover')
	img.style.opacity = 0;
	img.src = `https://flagcdn.com/${countryCode}.svg`;

	img.onload = () => {
		img.style.transition = "opacity 0.3s ease-in-out";
		img.style.opacity = 1;
	};
	flag.appendChild(imgCover);
	flag.appendChild(img);
}

const submitBtn = document.querySelector(".submitBtn")
const answer = document.querySelector(".answer")

function checkAnswer(countryName) {
	let currentAns = answer.value
	if (currentAns === countryName) {
		console.log("you won!!!")
	} else (console.log("try again!!"))
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
	return fetch('./countries.json')
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			let Destinationcountry = foo.country
			let Guessedcountry = answer.value.toLowerCase()
			let distance = calculateDistance(data[Destinationcountry].lat, data[Destinationcountry].lon, data[Guessedcountry].lat, data[Guessedcountry].lon)
			let bearing = calculateBearing(data[Guessedcountry].lat, data[Guessedcountry].lon, data[Destinationcountry].lat, data[Destinationcountry].lon)
			let direction = bearingToCompass(bearing)
			return [distance, direction]
		}
		)

		.catch(error => console.error('Failed to fetch data:', error));
}



function calculateDistance(lat1, long1, lat2, long2) {
	const R = 6371e3;
	const radianconvert = Math.PI / 180
	lat1 = lat1 * radianconvert
	lat2 = lat2 * radianconvert
	long1 = long1 * radianconvert
	long2 = long2 * radianconvert
	const a = Math.sin((lat2 - lat1) / 2) * Math.sin((lat2 - lat1) / 2) + (Math.cos(lat1)) * Math.cos(lat2) * (Math.sin((long2 - long1) / 2) * Math.sin((long2 - long1) / 2))
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const d = R * c
	return Math.floor(d / 1000)
}

function calculateBearing(lat1, long1, lat2, long2) {
	const radianconvert = Math.PI / 180
	lat1 = lat1 * radianconvert
	lat2 = lat2 * radianconvert
	long1 = long1 * radianconvert
	long2 = long2 * radianconvert
	const y = Math.sin(long2 - long1) * Math.cos(lat2);
	const x = Math.cos(lat1) * Math.sin(lat2) -
		Math.sin(lat1) * Math.cos(lat2) * Math.cos(long2 - long1);
	const θ = Math.atan2(y, x);
	const brng = (θ * 180 / Math.PI + 360) % 360;
	return brng
}

function bearingToCompass(bearing) {
	const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	const index = Math.round(bearing / 45) % 8;
	return dirs[index]
}
