/**
 *  index page javascript - main
 */
(function () {
    
    //regularly accessed elements
    var body = document.getElementsByTagName("body")[0],
    searchBtn = document.getElementById("searchBtn"),
    txtEmail = document.getElementById("txtEmail"),
    container = document.getElementById("container"),
    email = document.getElementById("emailId"),
    loading_container = document.getElementById("loading_container"),
    contentSection = document.getElementById("contentSection");;

    //Page Load function
    $(document).ready(function () {

        //Clear Local Storage on landing page
        window.localStorage.clear();

        //Search button click event
        searchBtn.addEventListener("click", function () {

            txtEmail.classList.remove("invalid");           //Invalid email message is hidden

            var emailId = document.getElementById("emailId").value;

             //Check email format
            var correctFormat = Common.ValidateEmail(emailId);

            if (correctFormat) {   
                ShowLoading();                               //Show Loading Gif
                HideContent();                               //Hide Main Content
                var urlAdd = "https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + emailId;//"doesmith@example.com"
                //var urlAdd = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + emailId;//"doesmith@example.com"
                Common.WebAPICall(urlAdd, successSearch, failSearch);
            }else{     
                txtEmail.classList.add("invalid");           //Invalid email message is shown
            }
        });
    });

    /* Function to show loading gif*/
    /* Param - No Params*/
    var ShowLoading = function(){
        loading_container.style.display = "flex";
        body.classList.add("loading_body");
    }

    /* Function to hide loading gif */
    /* Param - No Params*/
    var HideLoading = function(){
        loading_container.style.display = "none";
        body.classList.remove("loading_body");
    }

    /* Function to hide main content */
    /* Param - No Params*/
    var HideContent = function(){
        container.style.display = "none";
        contentSection.style.display = "none";
    }

    /* Function call on successful web call*/
    /* Param - data received from web call*/
    var successSearch = function (data) {       
        HideLoading();                              //Hide the loading gif
        window.localStorage["data"]=JSON.stringify(data);           //Store webresponse in localStorage
        window.location.href = "result.html";       //Transition to next page
    }

    /* Function call on failed web call*/
    /* Param - data received from web call*/
    var failSearch = function (data) {       
        HideLoading();                              //Hide the loading gif
        window.localStorage.clear();                //To be treated as no records found
        window.location.href = "result.html";       //Transition to next page
    }

})();