/**
 * Common variables and functionalities used across the project
 */

var Common = (function() {
    
    return{

    /* Function to validate email*/
    /* Param - email address to be checked */

    ValidateEmail  : function (emailId) {
        //RFC 2822 standard email validation
        return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailId));
    },

    WebAPICall : function (url, successCallBack, failureCallBack) {

        //var urlAdd = "https://cors-anywhere.herokuapp.com/https://ltv-data-api.herokuapp.com/api/v1/records.json?email=" + emailAddress;//"doesmith@example.com"
        var jqxhr = $.ajax({
            url: url,
            type: "get",
            dataType: "json",
            //data: values,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            success: function (data) {
                successCallBack(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                failureCallBack(errorThrown);
            }
        });
    }
}

})();
