$(document).ready(function () {

    // SUBMIT FORM
    $("#customerForm").submit(function (event) {

        // prevent the form from submitting via the web browser
        event.preventDefault();
        ajaxPost();

    });

    function ajaxPost() {

        // Prepare form data
        var formData = {
            firstName : $("#firstname").val(),
            lastName : $("#lastname").val()
        }

        // Do POST
        $.ajax({
           type : "POST",
           contentType : "application/json",
           url : window.location + "/api/customer/save",
           data : JSON.stringify(formData),
           dataType : 'json',
           success : function (result) {
               if (result.status === "Done") {
                   $("#postResultDiv").html("<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px'>" +
                       "Post Successfully! <br>" +
                       "---> Customer's Info: FirstName = " +
                       result.data.firstName + " ,LastName = " + result.data.lastName + "</p>");
               } else {
                   $("#postResultDiv").html("<strong>Error</strong>")
               }
               console.log(result);
           },
           error : function (e) {
                alert("Error!")
               console.log("ERROR: ", e);
           }
        });

        // reset Form Data after posting
        resetData();
    }

    function resetData() {
        $("#firstname").val("");
        $("#lastname").val("");
    }

});