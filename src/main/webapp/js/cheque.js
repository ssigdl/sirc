$(function() {
	// Date range picker
	$('#cheFechas').daterangepicker();
	$('#cheFechas').keypress(function(evt) {
		return false;
	});

	$("#searchBox").addClass("box-primary");
	$("#search_error_alert, #add_error_alert").hide();

	$("#searchResultTbl > tbody > tr > td:not(:has(button))").click(function() {
		console.log($($(this).closest("tr")).attr("id"));
	});

	$("#searchResultTbl .deleteCheck").click(function(){
		var chequeId = $($(this).closest("tr")).attr("id");
		console.log(chequeId);
	});
	
	$("#btnSwitchMode").click(function(){
		toggleAddSearchViews();
	});
	
	$(".close").click(function(event){
		/* Para evitar que haga los eventos preprogramados apra la ventana */
		event.stopPropagation();
		$(this).parent().hide();
	});
	
    loadBundles('es');
});

$(document)

/*Evento de envio de formulario de busqueda*/

.on('submit','#formSearchChecks',function(e) {
	e.preventDefault();
	var formData = $("#formSearchChecks :input").serializeArray();
	if ($.trim($("#formSearchChecks #cheNumero").val()) !== '' 
		|| $.trim($("#formSearchChecks #cheReceptor").val()) !== ''
		|| $.trim($("#formSearchChecks #cheFechas").val()) !== '') {
		
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
									'<td align="center">' + item.cheReceptor + '</td>' +
									'<td align="center">' + item.cheMonto + '</td>' +
									'<td align="center">' + item.cheFecha +'</td>' +
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
})

/*Evento de envio de formulario de alta*/

.on('submit','#formAddChecks',function(e) {
	e.preventDefault();
	var addErrorsCount = 0;
	if ($.trim($("#formAddChecks #cheNumero").val()) !== '' 
		|| $.trim($("#formAddChecks #cheReceptor").val()) !== ''
			|| $.trim($("#formAddChecks #cheFecha").val()) !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#search_error_alert").hide();
		$("#searchResultTbl > tbody > tr#trNoResult").hide();
		$("#searchResultTbl > tbody > tr:not(:last)").remove();
		
		var formData = $("#formAddChecks :input").serializeArray();
		$.ajax({
			type: "POST",
			url: "addCheck",
			data: formData,
			beforeSend: function ( xhr ) {
				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(data) {
				console.log(data);
			}
		});
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
						'<td align="center">' + item.cheReceptor + '</td>' +
						'<td align="center">' + item.cheMonto + '</td>' +
						'<td align="center">' + item.cheFecha +'</td>' +
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
		$("#add_error_alert").show();
	}
	return false;
})
.ready(function(){
	
	$('#cheFecha').datepicker({
	    format: "dd/mm/yyyy",
	    todayBtn: "linked",
	    autoclose: true,
	    todayHighlight: true
    });
})
;

var toggleAddSearchViews = function(){
	$("#box-title-search").toggle();
	$("#box-title-add").toggle();
	$("#formAddChecks").toggle();
	$("#formSearchChecks").toggle();
};

function loadBundles(lang) {
	jQuery.i18n.properties({
		name:'messages', 
		path:'../resources/',
	    mode:'both',
	    language:lang,
	    callback: function(){
//	    	console.log(jQuery.i18n.prop('check_receiver'))
	    }
	});
}