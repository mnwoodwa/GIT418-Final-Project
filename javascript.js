$("#accordion").accordion();


/*document.querySelector("#pinterestSubmit").addEventListener("click", function(e){
    e.preventDefault();
    //form input
    let searchInput = document.getElementById("#searchPinterest");

    //search query variable
    let query = encodeURIComponent(searchInput.value.trim());

    // error message span
   let errorSpan = document.querySelector("#pinterestAPI .message");

    //build output
    let output = "<ul>";

    //display output
    let searchResults = document.getElementById("pinterestResults");
    //searchResults.innerHTML = "";

     if(searchInput.value === "") {
        //display error
       searchInput.classList.add("errorInput");
       errorSpan.classList.add("error");
       return;
    } else {
        const data = null;
        const urlStart = 'https://pinterest-image-api1.p.rapidapi.com/images';
        const rapidApiKey = '7d3cfbb5e5msh8095543ec6da539p175e26jsn4dbfdc1cc7e6';
        const endPoint = `${urlStart}?term=${query}`;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === this.DONE) {
            //check status of returned response. Only want to show successful
            if(this.status === 200) {
                //API to JSON object
                let response = JSON.parse(this.responseText);
                //allow us to preview data
                console.log(response.images);

                //let output = "<ul>";
                for(let imageUrl of response.images) {
                    output += `<li><img src = "${imageUrl}" width: "200";"></li>`;
                }
                output += "</ul>";
                searchResults.innerHTML = output;
                searchInput.value = "";
            } else {
                searchResults.innerHTML = "<p>There was an issue with your call to the API.</p>";
                //console.error("API error:", this.status, this.responseText);
            }
        }
    });
    //send ajax request
    xhr.open('GET', endPoint);
    xhr.setRequestHeader('x-rapidapi-key', rapidApiKey);
    xhr.setRequestHeader('x-rapidapi-host', 'pinterest-image-api1.p.rapidapi.com');

    xhr.send(data);
    }
})
   
    */
/*function fetchAndDisplayImagesXHR() {

    const url = 'https://pinscrape.p.rapidapi.com/api/kurizutaz/sketches/pins';

    xhr.open('GET', url);
    xhr.withCredentials = true;

    xhr.setRequestHeader('x-rapidapi-key', '7d3cfbb5e5msh8095543ec6da539p175e26jsn4dbfdc1cc7e6');
    xhr.setRequestHeader('x-rapidapi-host', 'pinscrape.p.rapidapi.com');

    xhr.onReadyStateChange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    const resultsDiv = document.getElementById('pinterestResults');
                    resultsDiv.innerHTML = "";

                    data.images.forEach(image => {
                        const img = document.createElement('img');
                        img.src = image.src;
                        img.alt = image.alt || 'Pinterest image';
                        img.style.width = '200px';
                        img.style.margin = '5px';
                        resultsDiv.appendChild(img);
                    });
                } catch(error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('API request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}

fetchAndDisplayImagesXHR();
*/
document.addEventListener("DOMContentLoaded", () => {
    const pinterestForm = document.querySelector("#pinterestAPI form");
    const resultsDiv = document.getElementById("pinterestResults");

    pinterestForm.addEventListener("submit", async(e) => {
        e.preventDefault();
        resultsDiv.innerHTML = "<p>Loading images...</p>";
        const query = document.getElementById("searchPinterest").value.trim();
        if(!query) {
            resultsDiv.innerHTML = "<p>Please enter a search term.</p>"
            return;
        }
        const url = 'https://pinscrape.p.rapidapi.com/api/kurizutaz/sketches/pins';
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '7d3cfbb5e5msh8095543ec6da539p175e26jsn4dbfdc1cc7e6',
                    'x-rapidapi-host': 'pinscrape.p.rapidapi.com',
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();

            if(!data.images || data.images.length === 0) {
                resultsDiv.innerHTML = "<p>No images found</p>";
                return;
            }
            resultsDiv.innerHTML = "";

            data.images.forEach((imgData) => {
                const img = document.createElement("img");
                img.src = imgData.src;
                img.alt = imgData.alt || "Pinterest image";
                img.style.width = "200px";
                img.style.margin = "5px";
                resultsDiv.appendChild(img);
            });
            document.getElementById("searchPinterest").value = "";
        } catch(error) {
            console.error("Fetch error:", error);
            resultsDiv.innerHTML = `<p>There was a problem fetching images: ${error.message}</p>`;
        }
    });
});
function createUser(e) {
    e.preventDefault();

    //form input
    let fNameInput = document.getElementById("firstName");
    let lNameInput = document.getElementById("lastName");
    let silverRadio = document.getElementById("prefSilver");
    let goldRadio = document.getElementById("prefGold");
    let emailInput = document.getElementById("myEmail");
    let phoneInput = document.getElementById("myPhone");

    //error message span
    let errorSpan = document.getElementById("#storeObjects .message");

    //confirms if user wants to add another user
    let modal = document.getElementById("modal2");

    //clear previous errors
    fNameInput.classList.remove("errorInput");
    lNameInput.classList.remove("errorInput");
    silverRadio.classList.remove("errorInput");
    goldRadio.classList.remove("errorInput");
    emailInput.classList.remove("errorInput");
    phoneInput.classList.remove("errorInput");
    for(let span of errorSpan) {
        span.classList.remove("error");
    }
    //validity check
    let isValid = true;

    //validate each input
    if(fNameInput.value === ""){
        fNameInput.classList.add("errorInput");
        errorSpan[0].classList.add("error");
        isValid = false;
    }

    //validate each input
    if(lNameInput.value === ""){
        fNameInput.classList.add("errorInput");
        errorSpan[0].classList.add("error");
        isValid = false;
    }

    //if(silverRadio.checked) {
    //    document.querySelector("label[for\")
    //}
    if(isValid) {
        //user object
        let user = {};
    }
    if(silverRadio.checked) {
        user = {
            firstName: fNameInput.value,
            lastName: lNameInput.value,
            metalPref: "silver",
            email: emailInput.value,
            phone: phoneInput.value
    };
    } else {
        user = {
            firstName: fNameInput.value,
            lastName: lNameInput.value,
            metalPref: "gold",
            email: emailInput.value,
            phone: phoneInput.value
        };
    }
    //user to local storage
    if(localStorage.getItem("newUser")) {
        modal.classList.remove("hidden");
        //if they click confirm replace new user with the old
        document.getElementById("confirm2").addEventListener("click", function(){
            //stringify JSON
            let userString = JSON.stringify(user);
            //remove original object
            localStorage.removeItem("newUser");
            //write new object to storage
            localStorage.setItem("newUser", userString);
            //display user
            displayUser();
            //reset the form
            fNameInput.value = "";
            lNameInput.value = "";
            goldRadio.checked = true;
            silverRadio.checked = false;
            emailInput.value = "";
            phoneInput.value = "";
        });
        //if they click cancel
        document.getElementById("cancel2").addEventListener("click", function(){
            //hide modal
            modal.classList.add("hidden");
        });
    } else {
        //stringify JSON
        let userString = JSON.stringify(user);
        //write it to local storage
        localStorage.setItem("newUser", userString);
        //display user
        displayUser();
        //reset form
        fNameInput.value = "";
        lNameInput.value = "";
        goldRadio.checked = true;
        silverRadio.checked = false;
        emailInput.value = "";
        phoneInput.value = "";
    }
}

function displayUser() {
    //check if there is a user in storage
    if(localStorage.getItem("newUser")) {
        //paragraph to display output
        let outputP = document.getElementById("objectDisplay");
        //string for output build
        let output = "";
        //get user from storage
        let userString = localStorage.getItem("newUser");
        //parse string into JSON
        let user = JSON.parse(userString);

        if(user.metalPref == "silver") {
            output += `<strong>Welcome Back!</strong>
                        <br>${user.firstName} ${user.lastName}
                        <br>${user.email} ${user.phone}`;
        } else {
            output += `<strong>Welcome Back!</strong>
                        <br>${user.firstName} ${user.lastName}
                        <br>${user.email} ${user.phone}`;
        }
        //display object properties
        outputP.innerHTML = output;
    }
}

const slides = document.querySelectorAll(".slides img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeCarousel);

function initializeCarousel() {
    if(slides.length > 0) {
    slides[slideIndex].classList.add("displaySlide");
    intervalId = setInterval(nextSlide, 10000);
    }
}
function showSlide(index) {
    if(index >= slides.length) {
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }
    slides.forEach(slide => {
        slide.classList.remove("displaySlide");
    });
    slides[slideIndex].classList.add("displaySlide");
}

function prevSlide() {
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex++;
    showSlide(slideIndex);
}