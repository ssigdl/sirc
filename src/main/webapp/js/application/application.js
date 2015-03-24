var lang = $("#inputLang").val();

var getTodayDate = function (){
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return year + "-" + month + "-" + day;  
};

var loadBundles = function (lang) {
	jQuery.i18n.properties({
		name:'messages', 
		path:'resources/',
	    mode:'both',
	    language:lang,
	    callback: function(){   }
	});
};
