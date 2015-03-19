$(function() {
	// Date range picker
	$('#cheFechas').daterangepicker();
	$('#cheFechas').keypress(function(evt) {
		return false;
	});

	$("#searchBox").addClass("box-primary");
	$("#search_error_alert, #add_error_alert, #add_success_alert").hide();

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
		/* Para evitar que haga los eventos preprogramados apra el mensaje de error */
		event.stopPropagation();
		$(this).parent().hide();
	});
	
    loadBundles('es');

    //Muestra texto boton
    $("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_add')));
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
//				console.log(JSONrespuesta);
				$("#searchChecksBox").show();
				
				if(JSONrespuesta.length > 0 ){
					var trNew = '';
					$.each(JSONrespuesta, function(i, item) {
						var lblDelete = jQuery.i18n.prop('entity_delete', jQuery.i18n.prop('menu_item_check'));
						var lblUpdate = jQuery.i18n.prop('entity_update', jQuery.i18n.prop('menu_item_check'));
						trNew += '<tr id="' + item.cheId + '">' + 
									'<td align="center">' + 
										'<button type="button" class="btn btn-danger btn-sm deleteCheck" title="' + lblDelete + '">' + 
											'<i class="fa fa-trash-o"></i>' +
										'</button>' + 
									'</td>' +
									'<td align="center">' + 
										'<form id="frmEdit' + item.cheId + ' role="form" method="post" action="updateCheck">' +
											'<input type="hidden" value="' + item.cheId + '" name="editCheId" id="editCheId" />' + 
											'<button type="submit" class="btn btn-primary btn-sm deleteCheck btnCheckEdit" title="' + lblUpdate + '" onclick="javascript: submitBtnCheckEdit(' + item.cheId + ');">' + 
												'<i class="fa fa-edit"></i>' +
											'</button>' +
										'</form>' + 	
									'</td>' +
									'<td align="center" style="font-weight:bold;">' + (i + 1) +' </td>' +
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
		&& $.trim($("#formAddChecks #cheReceptor").val()) !== ''
			&& $.trim($("#formAddChecks #cheMonto").val()) !== ''
				&& $.trim($("#formAddChecks #cheFecha").val()) !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#add_error_alert").hide();
		$("#add_success_alert").hide();
		
		var formData = {
			"cheNumero" : $("#formAddChecks #cheNumero").val(),
			"cheReceptor" : $("#formAddChecks #cheReceptor").val(),
			"cheMonto" : $("#formAddChecks #cheMonto").val(),
			"cheFecha" : $("#formAddChecks #cheFecha").val(),
			"cheConcepto" : $("#formAddChecks #cheConcepto").val()
		};
		
		$.ajax({
			type: "POST",
			url: "addCheck",
			data: JSON.stringify(formData),
			contentType: "application/json",
			dataType: "json",
			beforeSend: function ( xhr ) {
				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(response) {
				console.log(response);
				if(response.success == true){
					$("#add_success_alert").show();
					$("#searchBox").addClass("box-success");
					
					var itemCounter = $("#addResultTbl > tbody > tr:not(:last)").length;
					var cheNumero = $("#formAddChecks #cheNumero").val();
					var cheReceptor = $("#formAddChecks #cheReceptor").val();
					var cheMonto = $("#formAddChecks #cheMonto").val();
					var cheFecha = $("#formAddChecks #cheFecha").val();
					var cheConcepto = $("#formAddChecks #cheConcepto").val();
					
					//Si no hay registros agregados, quita el mensaje default y limpia tabla
					if(itemCounter == 0 && $("#addResultTbl > tbody > tr#trNoResult").is(":visible")){
						$("#addResultTbl > tbody > tr#trNoResult").hide();
						$("#addResultTbl > tbody > tr:not(:last)").remove();
					}
					
					var trNew = 
					'<tr id="cheCount' + (itemCounter + 1) + '">' + 
						'<td align="center" style="font-weight:bold;">' + (itemCounter + 1) +' </td>' +
						'<td align="center">' + cheNumero +'</td>' +
						'<td align="center">' + cheReceptor + '</td>' +
						'<td align="center">' + cheMonto + '</td>' +
						'<td align="center">' + cheFecha +'</td>' +
						'<td align="center">' + cheConcepto + '</td>' +
					'</tr>';
					$("#addResultTbl > tbody > tr#trNoResult").before(trNew);
					
					$("#formAddChecks")[0].reset();
					console.log("true");
				}
				else if(response.success == false){
					$("#add_error_alert .txt").text(jQuery.i18n.prop('form_register_fail', jQuery.i18n.prop('menu_item_check')) + ": " + response.message);
					$("#searchBox").addClass("box-danger");
					$("#add_error_alert").show();
				}
			}
		});
	} else {
		$("#add_error_alert .txt").text(jQuery.i18n.prop('field_required_required_fields'));
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
//	$("#box-title-search").toggle();
//	$("#box-title-add").toggle();
//	$("#formAddChecks").toggle();
//	$("#formSearchChecks").toggle();
//	$("#searchChecksBox").toggle();
//	$("#addChecksBox").toggle();
//	
//	$("#searchBox").removeClass("box-danger");
//	$("#searchBox").removeClass("box-success");
//	$("#searchBox").addClass("box-primary");
//	$("#add_success_alert").hide();
//	$("#add_error_alert").hide();
	
	
	
	if($("#formSearchChecks").length){	
		window.location.href= 'createCheck';
//		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_add')));
	}
	else if($("#formAddChecks").length){
		window.location.href= 'readCheck';
//		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_search')));
	}
};

var submitBtnCheckEdit = function(cheId){
	console.log(cheId);
	$.ajax({
		type: "POST",
		url: "addCheck",
		data: JSON.stringify(formData),
		contentType: "application/json",
		dataType: "json",
		beforeSend: function ( xhr ) {
			console.log("before Send");
		},
		error: function (request, status, error) {            
			console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
		},
		success: function(response) {
			console.log(response);
			if(response.success == true){
				$("#add_success_alert").show();
				$("#searchBox").addClass("box-success");
				
				var itemCounter = $("#addResultTbl > tbody > tr:not(:last)").length;
				var cheNumero = $("#formAddChecks #cheNumero").val();
				var cheReceptor = $("#formAddChecks #cheReceptor").val();
				var cheMonto = $("#formAddChecks #cheMonto").val();
				var cheFecha = $("#formAddChecks #cheFecha").val();
				var cheConcepto = $("#formAddChecks #cheConcepto").val();
				
				//Si no hay registros agregados, quita el mensaje default y limpia tabla
				if(itemCounter == 0 && $("#addResultTbl > tbody > tr#trNoResult").is(":visible")){
					$("#addResultTbl > tbody > tr#trNoResult").hide();
					$("#addResultTbl > tbody > tr:not(:last)").remove();
				}
				
				var trNew = 
				'<tr id="cheCount' + (itemCounter + 1) + '">' + 
					'<td align="center" style="font-weight:bold;">' + (itemCounter + 1) +' </td>' +
					'<td align="center">' + cheNumero +'</td>' +
					'<td align="center">' + cheReceptor + '</td>' +
					'<td align="center">' + cheMonto + '</td>' +
					'<td align="center">' + cheFecha +'</td>' +
					'<td align="center">' + cheConcepto + '</td>' +
				'</tr>';
				$("#addResultTbl > tbody > tr#trNoResult").before(trNew);
				
				$("#formAddChecks")[0].reset();
				console.log("true");
			}
			else if(response.success == false){
				$("#add_error_alert .txt").text(jQuery.i18n.prop('form_register_fail', jQuery.i18n.prop('menu_item_check')) + ": " + response.message);
				$("#searchBox").addClass("box-danger");
				$("#add_error_alert").show();
			}
		}
	});
};

function loadBundles(lang) {
	jQuery.i18n.properties({
		name:'messages', 
		path:'../resources/',
	    mode:'both',
	    language:lang,
	    callback: function(){   }
	});
}