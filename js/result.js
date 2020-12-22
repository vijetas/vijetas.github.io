/**
 * Result page Javascript
 */

(function () {

    //regularly accessed elements
    var body = document.getElementsByTagName("body")[0],
    loading_container = document.getElementById("loading_container");


    $(document).ready(function () {
        

        PopulateData();

        //Search button click event
        document.getElementById("searchBtn").addEventListener("click", function () {

             //Check email format
            if (Common.ValidateEmail(document.getElementById("emailId").value)) {
                //Loading Sign
                $("#results-container").hide();
                $("#noResultsFound").hide();
                $("#result-search").hide();
                
                ShowLoading();                          //Show the loading gif

                //var urlAdd = "https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + emailId;//"doesmith@example.com"
                var urlAdd = "https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + emailId;//"doesmith@example.com"
                Common.WebAPICall(urlAdd, successSearch, failSearch);
            }else{
               //Show invalid email message
               $("#txtEmail").addClass("invalid");
            }
        });

    });


    /* Function to validate email*/
    /* Param - email address to be checked */
    var PopulateData = function() {
        
        var resHeader, resMsg, data = JSON.parse(window.localStorage["data"]);

        //Check that window.localStorage is not empty
        if (data) {
            resHeader = "1 Result";
            resMsg = "Look at the result below to see the details of the person you’re searched for.";
            document.getElementById("result-header").innerText = resHeader;
            document.getElementById("ResultsMsg").innerText = resMsg;

            document.getElementById("email").innerText = (data.email === undefined) ? "" : data.email;
            document.getElementById("address").innerText = (data.address === undefined) ? "" : data.address;
            var fullName = "";
            fullName = (data.first_name === undefined) ? "" : data.first_name + " ";
            fullName += (data.last_name === undefined) ? "" : data.last_name;
            document.getElementById("name").innerText =  fullName;
            document.getElementById("description").innerText = (data.description === undefined) ? "" : data.description;
            var str = "";
            var phone_numbers = data.phone_numbers;
            var relatives = data.relatives;
            if (phone_numbers) {
                phone_numbers.forEach(function (phone) {
                    str += '<li>' + phone + '</li>';
                });
            }
            document.getElementById("phoneNumbers").innerHTML = str;
            str = "";
            if (relatives) {
                relatives.forEach(function (rel) {
                    str += '<li>' + rel + '</li>';
                });
            }

            
            document.getElementById("relatives").innerHTML = str;
            $("#results-container").show();
            $("#noResultsFound").hide();
            $("#result-search").show();
        }
        else /*if (window.localStorage["noRecords"] == 0)*/ {
            resHeader = "0 Results";
            resMsg = "Try starting a new search below";
            document.getElementById("noResultsHeader").innerText = resHeader;
            document.getElementById("noResultsMsg").innerText = resMsg;
            $("#results-container").hide();
            $("#noResultsFound").show();
            $("#result-search").show();
        }
    }

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

    /* Function call on successful web call*/
    /* Param - data received from web call*/
    var successSearch = function (data) {
        
        HideLoading();                                             //Hide the loading gif
        if (data) {
            window.localStorage.clear();
        }
        else {
            window.localStorage["data"] = data;
        }
        window.location.href = "result.html";                      //Refresh page with new data
    }

    /* Function call on failed web call*/
    /* Param - data received from web call*/
    var failSearch = function (data) {
        
        HideLoading();                                             //Hide the loading gif
        window.localStorage.clear();
        window.location.replace("result.html"); //Transition to next page
    }


})();