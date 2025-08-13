$("#accordion").accordion();

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
        const url = 'https://pinscrape.p.rapidapi.com/api/hufflepuffnerd22/Whimsy/pins';
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

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#storeObjects form");
    const display = document.getElementById("objectDisplay");
    const modal = document.getElementById("modal2");
    const confirmBtn = document.getElementById("confirm2");
    const cancelBtn = document.getElementById("cancel2");

    let pendingUserData = null; //stores user that is about to be saved

    const storedUser = localStorage.getItem("user");
    if(storedUser) {
        const userObj = JSON.parse(storedUser);
        display.textContent = `Welcome back, ${userObj.firstName} ${userObj.lastName}`;
    }
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const userObj = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            metal: document.querySelector('input[name = "metal"]:checked').id === "prefGold" ? "Gold" : "Silver",
            email: document.getElementById("myEmail").value,
            phone: document.getElementById("myPhone").value
        };
        const existingUser = localStorage.getItem("user");

        if(existingUser) {
            pendingUserData = userObj;
            modal.classList.remove("hidden");
        } else {
            saveUser(userObj);
        }
    });

    confirmBtn.addEventListener("click", function(){
        if(pendingUserData) {
            saveUser(pendingUserData);
            pendingUserData = null;
        }
        modal.classList.add("hidden");
    });

    cancelBtn.addEventListener("click", function(){
        pendingUserData = null;
        modal.classList.add("hidden");
    });

    function saveUser(userObj) {
        localStorage.setItem("user", JSON.stringify(userObj));
        display.textContent = `Welcome, ${userObj.firstName} ${userObj.lastName}`;
    }
});
//});
/*
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
}*/

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