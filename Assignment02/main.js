let arrowDown = document.querySelectorAll(".arrowDown");
let arrowUp = document.querySelectorAll(".arrowUp");
let nextSection = document.querySelectorAll(".nextSection");
let previousSection = document.querySelectorAll(".previousSection");
// add functionality to arrowDown
for(let i = 0; i < arrowDown.length; i++) {
  arrowDown[i].addEventListener('click', function() {
    nextSection[i].click();
  });
}

// add functionality to arrowUp
for(let i = 0; i < arrowUp.length; i++) {
  arrowUp[i].addEventListener('click', function() {
    previousSection[i].click();
  });
}

// make all the arrow click go smoothly
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/*
  Start of Section 1 
*/
let resetBtn = document.querySelector(".resetBtn");
let reloadBtn = document.querySelector(".reloadBtn");
let pauseBtn = document.querySelector(".pauseBtn");

let loadingBar = document.querySelector(".loadingBar");
let loadingText = document.querySelector(".loadingText");

let pause = false;
let number = 0;

// have this to run when the page load up
let timer = setInterval(() => {
  if(!pause) {
    loadingText.innerHTML = `${number++}%`;
    loadingBar.style.width = String(number) + "%";
  }
  if(number >= 100) {
    clearInterval(timer);
    loadingText.innerHTML = "Finished!";
    pauseBtn.disabled = true;
  }
}, 25);

window.onload = () => timer;

// reset all the variables
let resetVar = () => {
  clearInterval(timer);
  number = 0;
  loadingText.innerHTML = `${number}%`;
  loadingBar.style.width = "0%";
  pause = false;
  pauseBtn.innerHTML = "Pause";
  pauseBtn.disabled = false;
};

resetBtn.addEventListener('click', function() {
  resetVar();
});

reloadBtn.addEventListener('click', function() {
  resetVar();

  timer = setInterval(() => {
    if(!pause) {
      loadingText.innerHTML = `${number++}%`;
      loadingBar.style.width = String(number) + "%";
    }
    if(number >= 100) {
      clearInterval(timer);
      loadingText.innerHTML = "Finished!";
      pauseBtn.disabled = true;
    }
  }, 25);
});

pauseBtn.addEventListener('click', function() {
  pause = !pause;
  if(pause) {
    pauseBtn.innerHTML = "Resume";
  }else{
    pauseBtn.innerHTML = "Pause";
  }
});

/*
  Start of Section 2 
*/
// data from https://www.w3schools.com/howto/howto_js_autocomplete.asp
let countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla",
"Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan",
"Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin",
"Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil",
"British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
"Cameroon","Canada","Cape Verde","Cayman Islands","Central African Republic","Chad",
"Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire",
"Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica",
"Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea",
"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France",
"French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana",
"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea",
"Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India",
"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan",
"Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan",
"Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
"Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali",
"Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
"Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar",
"Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia",
"New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan",
"Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines",
"Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
"Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia",
"Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia",
"Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
"Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland",
"Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand",
"Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan",
"Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
"United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City",
"Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

let searchBoxInput = document.querySelector(".searchBoxInput");
let suggestionList = document.querySelector(".suggestionList");
// use getElementsByClassName for live action
let suggestions = document.getElementsByClassName("suggestions");

searchBoxInput.addEventListener('keyup', function() {
  // Clear the list
  suggestionList.innerHTML = "";
  
  // If there is no input, then no suggestions
  if(!searchBoxInput.value) {
    suggestionList.style.visibility = "hidden";
    return;
  }

  for(let i = 0; i < countries.length; i++) {
    if(countries[i].substring(0, searchBoxInput.value.length).toUpperCase() == searchBoxInput.value.toUpperCase()) {
      let match = document.createElement("li");
      match.setAttribute("class", "suggestions");
      match.innerHTML = countries[i];
      match.addEventListener('click', function() {
        suggestionList.innerHTML = "";
        suggestionList.style.visibility = "hidden";
        searchBoxInput.value = match.innerHTML;
      });
      suggestionList.appendChild(match);
    }
  }

  // If there is no suggestions, then do NOT show the 'ul' element
  if(suggestions.length < 1) {
    suggestionList.style.visibility = "hidden";
  }else{
    suggestionList.style.visibility = "visible";
  }
});
