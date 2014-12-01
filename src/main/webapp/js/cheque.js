$(function() {
	var searchErrorsCount = $("#formErrorCount").val().replace(/'/g, "");

	// Date range picker
	$('#cheFechas').daterangepicker();
	$('#cheFechas').keypress(function(evt) {
		return false;
	});

	if (searchErrorsCount < 3) {
		$("#searchBox").addClass("box-primary");
		$("#search_error_alert").hide();
	} else if (searchErrorsCount == 3) {
		$("#searchBox").addClass("box-danger");
		$("#search_error_alert").show();
	}

	$("#searchResultTbl > tbody > tr > td:not(:has(button))").click(function() {
		console.log($($(this).closest("tr")).attr("id"));
	});

	$("#searchResultTbl .btn").click(function(){
		var chequeId = $($(this).closest("tr")).attr("id");
		console.log(chequeId);
	});
	
	$('#btnSendChecksForm').click(function(event) {
	    
		var formData = JSON.stringify($("#formSearchCheques :input").serialize()).replace(/"/g, "");
		
	    console.log(formData);
		$.ajax({
            type: "POST",
            url: "searchChecks",
            data: formData,
            beforeSend: function ( xhr ) {
	        	console.log("before Send");
            },
            error: function (request, status, error) {            
                console.log('Error ' + request.responseText + "\n" + status + "\n" + error);
            },
            success: function(JSONrespuesta) {
        		console.log("arf arf");
            }
        });
//		
//	    $.ajax({
//	        url: 'searchChecks',
//	        data: JSON.stringify(values),
//	        type: "POST",
//	        dataType : 'json',
//	        contentType: "application/json",
//	        beforeSend: function(xhr) {
//
////	            xhr.setRequestHeader("Accept", "application/json");
////	            xhr.setRequestHeader("Content-Type", "application/json");
//	        },
//	        error: function (request, status, error) {            
//               console.log('Error ' + request.responseText + "\n" + status + "\n" + error);
//            },
//	        success: function(response) {
////	            var respContent = "";
////	             
////	            respContent += "<span class='success'>Smartphone was created: [";
////	            respContent += smartphone.producer + " : ";
////	            respContent += smartphone.model + " : " ;
////	            respContent += smartphone.price + "]</span>";
////	             
////	            $("#sPhoneFromResponse").html(respContent);    
//	        	console.log("arf arf");
//	        }
//	    });
//	      
	    event.preventDefault();
	});
});