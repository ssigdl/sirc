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

	$("#searchResultTbl .btn").click(function(){
		var chequeId = $($(this).closest("tr")).attr("id");
		console.log(chequeId);
	});
	
	Number.prototype.padLeft = function(base,chr){
		var  len = (String(base || 10).length - String(this).length)+1;
		return len > 0? new Array(len).join(chr || '0')+this : this;
	};
	
		
		
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
		
		console.log(formData);
		
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
				
				$.each(JSONrespuesta, function(i, item) {
					var d = new Date(item.cheFecha),
					dformat = [ (d.getMonth()+1).padLeft(),
					            d.getDate().padLeft(),
					            d.getFullYear()].join('/');
					
					
					
					console.log(dformat);
				});
//    		console.log(new Date(JSONrespuesta[0].cheFecha).toGMTString());
			}
		});
	} else {
		$("#searchBox").addClass("box-danger");
		$("#search_error_alert").show();
	}
	return false;
//    event.preventDefault();
});