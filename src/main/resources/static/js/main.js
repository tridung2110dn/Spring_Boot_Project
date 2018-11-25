$(document).ready(function () {

    $("#update").hide();

    $("#save").click(function () {

        var formData = {
            firstName: $("#firstname").val(),
            lastName: $("#lastname").val()
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/customer/save",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function () {
                assignDataToTable();
            },
            error: function (e) {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
        // reset Form Data after posting
        resetData();
    });

    var dataTable = $('table');

    dataTable.on('click', 'button[id="deleteCustomer"]', function () {
        var id = $(this).closest('tr').children('td:first').text();

        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/customer/delete/" + id,
            success: function (data) {
                console.log("Success: " + data);
                assignDataToTable();
            },
            error: function (e) {
                alert("Error!");
                console.log("ERROR: ", e);
            }
        });
    });

    dataTable.on('click', 'button[id="editCustomer"]', function () {
        var $button = $(this);
        var id = $button.closest('tr').children('td:first').text();
        var firstName = $button.closest('tr').children('td:nth-child(2)').text();
        var lastName = $button.closest('tr').children('td:nth-child(3)').text();

        $("#firstname").val(firstName);
        $("#lastname").val(lastName);
        $("#save").hide();
        $("#update").show();

        $("#update").click(function () {
            var formData = {
                firstName: $("#firstname").val(),
                lastName: $("#lastname").val()
            };
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/api/customer/update/" + id,
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function () {
                    console.log("Success");
                    assignDataToTable();
                },
                error: function (e) {
                    console.log(e);
                    alert("Update Error!");
                }
            });
            resetData();
            $("#save").show();
            $("#update").hide();
        });
    });

    function assignDataToTable() {
        $("tbody").empty();
        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:8080/api/customer/all",
            success: function (data) {
                var customers = JSON.parse(JSON.stringify(data));
                for (var i in customers) {
                    $("tbody").append("<tr>" +
                        "<td>" + customers[i].id + "</td>\n" +
                        "<td>" + customers[i].firstName + "</td>\n" +
                        "<td>" + customers[i].lastName + "</td>\n" +
                        "<td><button class=\"btn btn-primary\" type=\"submit\" id=\"editCustomer\">Edit</button></td>\n" +
                        "<td><button class=\"btn btn-primary\" type=\"submit\" id=\"deleteCustomer\">Delete</button></td>\n" +
                        "</tr>");
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    }

    function resetData() {
        $("#firstname").val("");
        $("#lastname").val("");
    }

});