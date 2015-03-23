$(function() {

	$("#accordionLeft").accordion({
		collapsible: true,
		heightStyle: "content",
		active: 0
	});
	
    $("#accordionRight").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
	
	$(".alert-dismissable").hide();

	$("#searchResultTbl > tbody > tr > td:not(:has(button))").click(function() {
		console.log($($(this).closest("tr")).attr("id"));
	}); 

	$("#searchResultTbl .deleteCheck").click(function(){
		var chequeId = $($(this).closest("tr")).attr("id");
		console.log(chequeId);
	});
	
	$(".close").click(function(event){
		/* Para evitar que haga los eventos preprogramados para el mensaje de error */
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
	
	var cheNumero = $.trim($("#formSearchChecks #cheNumero").val()); 
	var cheReceptor = $.trim($("#formSearchChecks #cheReceptor").val()); 
	var cheFechaFrom = $.trim($("#formSearchChecks #cheFechaFrom").val()); 
	var cheFechaTo = $.trim($("#formSearchChecks #cheFechaTo").val()); 
	var pageIndex = $.trim($("#formSearchChecks #pageIndex").val()); 
	
	if (cheNumero !== '' || cheReceptor !== ''
	 || cheFechaFrom !== '' || cheFechaTo !== '') {
		
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
				console.log(JSONrespuesta);
				$("#searchBox").addClass("box-primary");
				$("#search_error_alert").hide();
				$("#searchResultTbl > tbody > tr#trNoResult").hide();
				$("#searchResultTbl > tbody > tr:not(:last)").remove();
				
				if(JSONrespuesta.resultCollection.length > 0 ){
					var trNew = '';
					$.each(JSONrespuesta.resultCollection, function(i, item) {
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

					if(pageIndex == 1 && $("#formSearchChecks #eventFirer").val() === "sendFirstTime"){
						$("#showCheckSearchResultPaginationId .pages").remove(); 
						var totalPages = JSONrespuesta.totalPages; 
						for (var index = 1; index <= totalPages; index++) {
							$("#showCheckSearchResultPaginationId .nextResult").before("<li class='pages'><a >" + index + "</a></li>")
						}
						$("#showCheckSearchResultPaginationId").show();
						sendPaginationRequestEvent();
						$("#searchBox").prev().click();
						$("#showCheckSearchResultBox").prev().click();
					}
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
	$("#cheFechaFrom").change(function(){
		$("#cheFechaTo").attr("min", $("#cheFechaFrom").val());
		$("#cheFechaTo").val($("#cheFechaFrom").val());
		$("#cheFechaTo").removeAttr("disabled");
	});
	
	$("#formSearchChecks #btnSendChecksForm").click(function(){
		$("#formSearchChecks #eventFirer").val("sendFirstTime");
		$("#formSearchChecks #pageIndex").val("1");
	});	
//	sendPaginationRequestEvent();
//	$("#showCheckSearchResultPaginationId").show();
});

var sendPaginationRequestEvent = function(){
	$("#showCheckSearchResultPaginationId .pages a").click(function(){
		console.log($(this).text());
		$("#formSearchChecks #eventFirer").val("sendPaginationRequest");
		$("#formSearchChecks #pageIndex").val($(this).text());
		$("#formSearchChecks").submit();
		return false; 
	});
};

var setAddedValuesToEdit = function(cheData){
	console.log(cheData);
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


//var toggleAddSearchViews = function(){
//	if($("#formSearchChecks").length){	
//		window.location.href= 'check/createCheck';
////		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_add')));
//	}
//	else if($("#formAddCheck").length || $("#formEditCheck").length){
//		window.location.href= 'check/readCheck';
////		$("#btnSwitchMode .txt").text(jQuery.i18n.prop('body_switch_view', jQuery.i18n.prop('body_search')));
//	}
//};

//activate: function(event, ui) {
//var oldHeaderId = $(ui.oldHeader).next().attr("id") ;
//var newHeaderId = $(ui.newHeader).next().attr("id") ;
//if(oldHeaderId !== undefined){
//	if(oldHeaderId === "searchBox" && $("#showCheckSearchResultBox").is(":visible")){
//		$("#showCheckSearchResultBox").prev().click();
//	}
//	else if(oldHeaderId === "showCheckSearchResultBox" && $("#searchBox").is(":visible")){
//		$("#searchBox").prev().click();
//	}
//	
//	if((oldHeaderId === "addBox" || oldHeaderId === "editBox") && $("#editAddCheckBox").is(":visible")){
//		$("#editAddCheckBox").prev().click();
//	}
//	else if(oldHeaderId === "editAddCheckBox"){
//		if($("#addBox").is(":visible")){
//			$("#addBox").prev().click();
//		}
//		else if($("#editBox").is(":visible")){
//			$("#editBox").prev().click();
//		}
//	}
//}
//else if(newHeaderId !== undefined){
//	if(newHeaderId === "searchBox" && $("#showCheckSearchResultBox").is(":visible") == false){
//		$("#showCheckSearchResultBox").prev().click();
//	}
//	else if(newHeaderId === "showCheckSearchResultBox" && $("#searchBox").is(":visible") == false){
//		$("#searchBox").prev().click();
//	}
//}
//}