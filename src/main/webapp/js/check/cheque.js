/*Funcion que contiene el evento de eliminacion*/
var deleteCheck = function(cheId){
	var formData = {"cheId": cheId};
	
	var button_delete = jQuery.i18n.prop('body_delete');
	var button_cancel = jQuery.i18n.prop('button_cancel');
	
	console.log(cheId);
	$( "#dialogDeleteConfirmMessage" ).dialog({
		buttons: [{
			text : button_delete,
			click : function() {
        		$.ajax({
        			type: "POST",
        			url: "check/delete",
        			data: JSON.stringify(formData),
        			contentType: "application/json",
        			dataType: "json",
        			beforeSend: function ( xhr ) {
//        				console.log("before Send");
        			},
        			error: function (request, status, error) {            
        				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
        			},
        			success: function(JSONresponse) {
        				
        				$("#delete_error_alert").hide();
        				
        				if(JSONresponse.success == true){
        					$("#delete_success_alert").show();
        					$("#searchResultTbl #trChe" + cheId).fadeOut(300, function() { $(this).remove(); });
        				}
        				else if(JSONresponse.success == false){
        					$("#delete_error_alert").show();
        				}
        			}
        		});
        		$( this ).dialog( "close" );
			}
		  },
          {
          text : button_cancel,
          click : function() {
            $( this ).dialog( "close" );
          }
        }]
    }).dialog("open");
};

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
//				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(JSONrespuesta) {
				$("#searchBox").addClass("box-primary");
				$("#search_error_alert").hide();
				$("#searchResultTbl > tbody > tr#trNoResult").hide();
				$("#searchResultTbl > tbody > tr:not(:last)").remove();
				
				if(JSONrespuesta.resultCollection.length > 0 ){
					var trNew = '';
					$.each(JSONrespuesta.resultCollection, function(i, item) {
						var lblDelete = jQuery.i18n.prop('entity_delete', jQuery.i18n.prop('menu_item_check'));
						var lblUpdate = jQuery.i18n.prop('entity_update', jQuery.i18n.prop('menu_item_check'));
						trNew += '<tr id="trChe' + item.cheId + '">' +
									'<input type="hidden" name="cheId" id="cheId" value="' + item.cheId+ '" />'+
									'<td align="center">' + 
										'<button type="button" class="btn btn-danger btn-sm deleteCheck" title="' + lblDelete + '" onclick="deleteCheck('+item.cheId+')">' + 
											'<i class="fa fa-trash-o"></i>' +
										'</button>' + 
									'</td>' +
									'<td align="center">' + 
										'<button type="submit" class="btn btn-primary btn-sm deleteCheck btnCheckEdit" title="' + lblUpdate + '" onclick="setValuesToEdit('+item.cheId+')" >' + 
											'<i class="fa fa-edit"></i>' +
										'</button>' +
									'</td>' +
									'<td align="center" style="font-weight:bold;">' +(((pageIndex - 1) * 10) + (i + 1)) +' </td>' +
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
						$("#accordionLeft").accordion({active: false});
						$("#accordionRight").accordion({active: 0});
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
//				console.log("before Send");
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
					
					var formattedCheFecha = cheFecha.split("-").reverse().join("/");
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
						'<td align="center">' + cheMonto.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '</td>' +
						'<td align="center">' + formattedCheFecha +'</td>' +
						'<td align="center">' + cheConcepto + '</td>' +
					'</tr>';
					$("#addResultTbl > tbody > tr#trNoResult").before(trNew);
					
					$("#addResultTbl #trChe" + response.cheId + " .btnCheckEdit").click(function(){
						setValuesToEdit(response.cheId);
					});
					
					$("#formAddCheck :input").not("input[type=date]").val("");
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

	var cheId = $.trim($("#formEditCheck #cheId").val());
	var cheNumero = $.trim($("#formEditCheck #cheNumero").val());
	var cheReceptor = $.trim($("#formEditCheck #cheReceptor").val());
	var cheMonto = $.trim($("#formEditCheck #cheMonto").val());
	var cheFecha = $.trim($("#formEditCheck #cheFecha").val());
	var cheConcepto= $.trim($("#formEditCheck #cheConcepto").val());
	
	if (cheNumero !== '' 
		&& cheReceptor !== ''
			&& cheMonto !== ''
				&& cheFecha !== '') {
		
		$("#searchBox").addClass("box-primary");
		$("#add_error_alert").hide();
		$("#add_success_alert").hide();
		
		var formData = {
			"cheId" : cheId,
			"cheNumero" : cheNumero,
			"cheReceptor" : cheReceptor,
			"cheMonto" : cheMonto,
			"cheFecha" : cheFecha,
			"cheConcepto" :cheConcepto
		};
		
		$.ajax({
			type: "POST",
			url: "check/edit",
			data: JSON.stringify(formData),
			contentType: "application/json",
			dataType: "json",
			beforeSend: function ( xhr ) {
//				console.log("before Send");
			},
			error: function (request, status, error) {            
				console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
			},
			success: function(response) {
				if(response.success == true){
					$("#edit_success_alert").show();
					$("#searchBox").addClass("box-success");
					if($("#accordionRight").accordion('option', 'active') == 0){
						$("#formSearchChecks #btnSendChecksForm").click();
					}
					else if($("#accordionRight").accordion('option', 'active') == 1){
						var formattedCheFecha = cheFecha.split("-").reverse().join("/");
						$("#accordionLeft").accordion({active: 1});
						$("#addResultTbl > tbody #trChe" + $("#formEditCheck #cheId").val() + " td:eq(2)").text(cheNumero);
						$("#addResultTbl > tbody #trChe" + $("#formEditCheck #cheId").val() + " td:eq(3)").text(cheReceptor);
						$("#addResultTbl > tbody #trChe" + $("#formEditCheck #cheId").val() + " td:eq(4)").text(cheMonto.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
						$("#addResultTbl > tbody #trChe" + $("#formEditCheck #cheId").val() + " td:eq(5)").text(formattedCheFecha);
						$("#addResultTbl > tbody #trChe" + $("#formEditCheck #cheId").val() + " td:eq(6)").text(cheConcepto);
					}
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
	
	var today = getTodayDate();
	
	$( "#dialogSelectItemToEdit" ).dialog({
		autoOpen: false,	
	});

    $( "#dialogDeleteConfirmMessage" ).dialog({
    	autoOpen: false,	
        resizable: false,
        height:170,
        modal: true
      });
	
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
	
    $('input[type=date]').val(today);
    
    $("#cheFechaFrom").change(function(){
    	$("#cheFechaTo").attr("min", $("#cheFechaFrom").val());
    	$("#cheFechaTo").removeAttr("disabled");
    });

    $(".accordionSection").accordion({
    	activate: function(event, ui) {
//	    	var oldHeaderId = $(ui.oldHeader).next().attr("id") ;
	    	var newHeaderId = $(ui.newHeader).next().attr("id") ;
	    	if((newHeaderId === "searchBox") 
			&& $("#accordionRight").accordion('option', 'active') !== false){
	    		$("#accordionRight").accordion({active: false});
    		}
	    	else if(newHeaderId === "addBox" || newHeaderId === "editBox"){
	    		$("#accordionRight").accordion({active: 1});
	    		
	    		if(newHeaderId === "editBox" && 
				($("#formEditCheck #cheId").val() === "" || $("#formEditCheck #cheId").val() === undefined)){
	    			
	    			$( "#dialogSelectItemToEdit" ).dialog({ 
	    				close: function(){
	    					$(this).parent().promise().done(function () {
	    						$("#accordionLeft").accordion({active: 0});
	    					});
	    				}
	    		    }).dialog("open");
	    		}
	    	}
    	}
    });

	$("#formSearchChecks #btnSendChecksForm").click(function(){
		$("#formSearchChecks #eventFirer").val("sendFirstTime");
		$("#formSearchChecks #pageIndex").val("1");
	});	
	
	$(".close").click(function(event){
		/* Para evitar que haga los eventos preprogramados para el mensaje de error */
		event.stopPropagation();
		$(this).parent().hide();
	});

	$(".alert-dismissable").hide();
	var lang = getURLParameter("lang");
	console.log(lang);
	loadBundles(lang);
});

/*Funcion que contiene el evento de paginacion*/
var sendPaginationRequestEvent = function(){
	$("#showCheckSearchResultPaginationId .pages a").click(function(){
		$("#formSearchChecks #eventFirer").val("sendPaginationRequest");
		$("#formSearchChecks #pageIndex").val($(this).text());
		$("#formSearchChecks").submit();
		return false; 
	});
};

/*Funcion que contiene el evento de validacion y asignacion de valores para editar*/
var setValuesToEdit = function(cheId){
	var formData = {"cheId": cheId};
	$.ajax({
		type: "POST",
		url: "check/updateCheck",
		data: JSON.stringify(formData),
		contentType: "application/json",
		dataType: "json",
		beforeSend: function ( xhr ) {
//			console.log("before Send");
		},
		error: function (request, status, error) {            
			console.log('Error ' /*+ request.responseText*/ + "\n" + status + "\n" + error);
		},
		success: function(JSONresponse) {
			console.log(JSONresponse);
			var formattedCheMonto = JSONresponse.cheMonto.replace(/,/g, ""); 
			var formattedCheFecha = JSONresponse.cheFecha.split("/").reverse().join("-"); 
			
			$("#formEditCheck #cheId").val(JSONresponse.cheId);
			$("#formEditCheck #cheNumero").val(JSONresponse.cheNumero);
			$("#formEditCheck #cheFecha").val(formattedCheFecha);
			$("#formEditCheck #cheMonto").val(formattedCheMonto);
			$("#formEditCheck #cheReceptor").val(JSONresponse.cheReceptor);
			$("#formEditCheck #cheConcepto").val(JSONresponse.cheConcepto);
			$("#accordionLeft").accordion({active: 2});
		}
	});
};




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
