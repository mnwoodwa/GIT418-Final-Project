$("#accordion").accordion();

//function searchPinterest() {
    //e.preventDefault();
//}
document.querySelector("#pinterestSubmit").addEventListener("click", function(e){
    e.preventDefault();
    //form input
    let searchInput = document.getElementById("searchPinterest");

    //search query variable
    let query = encodeURIComponent(searchInput.value.trim());

    // error message span
   // let errorSpan = document.querySelector("#apisExample .message");

    //build output
    //let output = "<ul>";

    //display output
    let searchResults = document.getElementById("pinterestResults");
    searchResults.innerHTML = "";

    if(!query) {
        searchResults.innerHTML = "<p>Please enter a search term.</p>";
        return;
    }

    const url = `https://pinterest-image-api1.p.rapidapi.com/images?search=${query}`;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === this.DONE) {
            //check status of returned response. Only want to show successful
            if(this.status === 200) {
                //API to JSON object
                let response = JSON.parse(this.response);
                //allow us to preview data
                console.log(response);

                let output = "<ul>";
                (response.images || []).forEach(result => {
                    output += `<li><a href = "${result.url}" target = "_blank">View image</a></li>`;
                });
                output += "</ul>";
                searchResults.innerHTML = output;
                searchInput.value = "";
            } else {
                searchResults.innerHTML = "<p>There was an issue with your call to the API.</p>";
                console.error("API error:", this.status, this.responseText);
            }
        }
    });
    //send ajax request
    xhr.open('GET', url);
    xhr.setRequestHeader('x-rapidapi-key', '7d3cfbb5e5msh8095543ec6da539p175e26jsn4dbfdc1cc7e6');
    xhr.setRequestHeader('x-rapidapi-host', 'pinterest-image-api1.p.rapidapi.com');

    xhr.send();
});
    //clear old output and error messages
    //searchInput.classList.remove("errorInput");
   // errorSpan.classList.remove("error");
   // searchResults.innerHTML = "";

    //is the input empty?
   // if(searchInput.value === "") {
        //display error
      //  searchInput.classList.add("errorInput");
      //  errorSpan.classList.add("error");
   // } else {
        //const data = null;
        //const urlStart = "https://pinterest-image-api1.p.rapidapi.com/images";
        //const rapidApiKey = "7d3cfbb5e5msh8095543ec6da539p175e26jsn4dbfdc1cc7e6";
       // const endPoint = `${urlStart}?search=${query}`;

    //create ajax object
    //const xhr = new XMLHttpRequest();
    //api key will be used with this request
    //xhr.withCredentials = true;

   
                //format output
               // for(let result of response.results) {
                   // output += `<li><a href = "${result.images}">`;
              //  }
               // output += "</ul>";
                //add results to the page
               // searchResults.innerHTML = output;
               // searchInput.value = "";
           // } else {
                //display an issue
                //searchResults.innerHTML = "<p>There was an issue with your call to the API. Check your endpoint, code, and key</p>";
           // }
       // }
   // });

    //send ajax request
    

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




}