$(function() {
	// Date range picker
	$('#cheFechas').daterangepicker();
	$('#cheFechas').keypress(function(evt) {
		return false;
	});

	$(".alert-dismissable").hide();

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
			url: "check/search",
			data: formData,
			beforeSend: function ( xhr ) {
				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(JSONrespuesta) {
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
										'<form id="frmEdit' + item.cheId + ' role="form" method="post" action="check/updateCheck">' +
											'<input type="hidden" value="' + item.cheId + '" name="editCheId" id="editCheId" />' + 
											'<button type="submit" class="btn btn-primary btn-sm deleteCheck btnCheckEdit" title="' + lblUpdate + '" >' + 
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

/*Evento de envio de formulario de creacion*/

.on('submit','#formAddCheck',function(e) {
	e.preventDefault();
	var addErrorsCount = 0;
	if ($.trim($("#formAddCheck #cheNumero").val()) !== '' 
		&& $.trim($("#formAddCheck #cheReceptor").val()) !== ''
			&& $.trim($("#formAddCheck #cheMonto").val()) !== ''
				&& $.trim($("#formAddCheck #cheFecha").val()) !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#add_error_alert").hide();
		$("#add_success_alert").hide();
		
		var formData = {
			cheNumero : $("#formAddCheck #cheNumero").val(),
			cheReceptor : $("#formAddCheck #cheReceptor").val(),
			cheMonto : $("#formAddCheck #cheMonto").val(),
			cheFecha : $("#formAddCheck #cheFecha").val(),
			cheConcepto : $("#formAddCheck #cheConcepto").val()
		};
		
		$.ajax({
			type: "POST",
			url: "check/add",
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
				if(response.success == true){
					$("#add_success_alert").show();
					$("#searchBox").addClass("box-success");
					
					var itemCounter = $("#addResultTbl > tbody > tr:not(:last)").length;
					var cheNumero = $("#formAddCheck #cheNumero").val();
					var cheReceptor = $("#formAddCheck #cheReceptor").val();
					var cheMonto = $("#formAddCheck #cheMonto").val();
					var cheFecha = $("#formAddCheck #cheFecha").val();
					var cheConcepto = $("#formAddCheck #cheConcepto").val();

					//Si no hay registros agregados, quita el mensaje default y limpia tabla
					if(itemCounter == 0 && $("#addResultTbl > tbody > tr#trNoResult").is(":visible")){
						$("#addResultTbl > tbody > tr#trNoResult").hide();
						$("#addResultTbl > tbody > tr:not(:last)").remove();
					}
					var lblUpdate = jQuery.i18n.prop('entity_update', jQuery.i18n.prop('menu_item_check'));
					var trNew = 
					'<tr id="trChe' + (response.cheId) + '">' + 
						'<td align="center">' + 
							'<button type="submit" class="btn btn-primary btn-sm deleteCheck btnCheckEdit" title="' + lblUpdate + '" >' + 
								'<i class="fa fa-edit"></i>' +
							'</button>' +
						'</td>' +
						'<td align="center" style="font-weight:bold;">' + (itemCounter + 1) +' </td>' +
						'<td align="center">' + cheNumero +'</td>' +
						'<td align="center">' + cheReceptor + '</td>' +
						'<td align="center">' + cheMonto + '</td>' +
						'<td align="center">' + cheFecha +'</td>' +
						'<td align="center">' + cheConcepto + '</td>' +
					'</tr>';
					$("#addResultTbl > tbody > tr#trNoResult").before(trNew);
					
					$("#trChe" + response.cheId + " .btnCheckEdit").click(function(){
						formData.cheId = response.cheId;
						setAddedValuesToEdit(formData);
					});
					
					$("#formAddCheck")[0].reset();
				}
				else if(response.success == false){
					$("#add_error_alert .txt").text(jQuery.i18n.prop('form_register_fail', jQuery.i18n.prop('menu_item_check')) + ": " + response.message);
					$("#addBox").addClass("box-danger");
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

/*Evento de envio de formulario de edicion*/

.on('submit','#formEditCheck',function(e) {
	e.preventDefault();
	var addErrorsCount = 0;
	if ($.trim($("#formEditCheck #cheNumero").val()) !== '' 
		&& $.trim($("#formEditCheck #cheReceptor").val()) !== ''
			&& $.trim($("#formEditCheck #cheMonto").val()) !== ''
				&& $.trim($("#formEditCheck #cheFecha").val()) !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#add_error_alert").hide();
		$("#add_success_alert").hide();
		
		var formData = {
			"cheId" : $("#formEditCheck #cheId").val(),
			"cheNumero" : $("#formEditCheck #cheNumero").val(),
			"cheReceptor" : $("#formEditCheck #cheReceptor").val(),
			"cheMonto" : $("#formEditCheck #cheMonto").val(),
			"cheFecha" : $("#formEditCheck #cheFecha").val(),
			"cheConcepto" : $("#formEditCheck #cheConcepto").val()
		};
		
		$.ajax({
			type: "POST",
			url: "check/edit",
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
					$("#edit_success_alert").show();
					$("#searchBox").addClass("box-success");
				}
				else if(response.success == false){
					$("#edit_error_alert .txt").text(jQuery.i18n.prop('form_update_fail', jQuery.i18n.prop('menu_item_check')) + ": " + response.message);
					$("#editBox").addClass("box-danger");
					$("#edit_error_alert").show();
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
	
	$("#dialog").dialog();
})
;

var toggleAddSearchViews = function(){
	if($("#formSearchChecks").length){	
		window.location.href= 'check/createCheck';
//		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_add')));
	}
	else if($("#formAddCheck").length || $("#formEditCheck").length){
		window.location.href= 'check/readCheck';
//		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_search')));
	}
};

var setAddedValuesToEdit = function(cheData){
	console.log(cheData);

	//Me quede en que voy a hacer usando el dialog de jQueryUI uso del Modal Form para hacer una funcion unica reusable en los 2 lugares de buscar y agregar
	//A pArte voy a separar este script
	
	//	$("#dialog_trigger").click( function() {

	
	//	    $("#dialog").load('check/updateCheck', {'editCheId': cheData.cheId}, function() {
//
//	    });
//	})
};

function loadBundles(lang) {
	jQuery.i18n.properties({
		name:'messages', 
		path:'resources/',
	    mode:'both',
	    language:lang,
	    callback: function(){   }
	});
}