$(function() {
	var searchErrorsCount = $("#formErrorCount").val().replace(/'/g, "");

	// Date range picker
	$('#cheFechas').daterangepicker();
	$('#cheFechas').keypress(function(evt) {
		return false;
	});

	$("#searchBox").addClass("box-primary");
	$("#search_error_alert").hide();

	$("#searchResultTbl > tbody > tr > td:not(:has(button))").click(function() {
		console.log($($(this).closest("tr")).attr("id"));
	});

	$("#searchResultTbl .deleteCheck").click(function(){
		var chequeId = $($(this).closest("tr")).attr("id");
		console.log(chequeId);
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

});

$(document).on('submit','#formSearchCheques',function(e) {
	e.preventDefault();
	var formData = $("#formSearchCheques :input").serializeArray();
	var searchErrorsCount = 0;
	if ($.trim($("#formSearchCheques #cheNumero").val()) !== '' 
		|| $.trim($("#formSearchCheques #cheReceptor").val()) !== ''
		|| $.trim($("#formSearchCheques #cheFechas").val()) !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#search_error_alert").hide();
		$("#searchResultTbl > tbody > tr#trNoResult").hide();
		$("#searchResultTbl > tbody > tr:not(:last)").remove();
		
		$.ajax({
			type: "POST",
			url: "searchChecks",
			data: formData,
			beforeSend: function ( xhr ) {
				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(JSONrespuesta) {
				console.log(JSONrespuesta);
				$("#searchChecksBox").show();
				
				if(JSONrespuesta.length > 0 ){
					var trNew = '';
					$.each(JSONrespuesta, function(i, item) {
						trNew += '<tr id="' + item.cheId + '">' + 
									'<td align="center">' + 
										'<button type="button" class="btn btn-danger btn-sm deleteCheck">' + 
											'<i class="fa fa-trash-o"></i>' +
										'</button>' + 
									'</td>' +
									'<td align="center">' + (i + 1) +' </td>' +
									'<td align="center">' + item.cheNumero +'</td>' +
									'<td align="center">' + item.cheFecha +'</td>' +
									'<td align="center">' + item.cheMonto + '</td>' +
									'<td align="center">' + item.cheReceptor + '</td>' +
									'<td align="center">' + item.cheConcepto + '</td>' +
								'</tr>';
					});
					$("#searchResultTbl > tbody > tr#trNoResult").before(trNew);
				}
				else{
					$("#searchResultTbl > tbody > tr#trNoResult").show();
				}
			}
		});
	} else {
		$("#searchBox").addClass("box-danger");
		$("#search_error_alert").show();
	}
	return false;
});