<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>


<!DOCTYPE html>
<html>
<spring:url value="/resources/css" var="css_url" />
<spring:url value="/resources/js" var="js_url" />
<head>
<meta charset="UTF-8">
<title>AdminLTE | Dashboard</title>
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<!-- bootstrap 3.0.2 -->
<link href="${css_url}/bootstrap.min.css" rel="stylesheet" type="text/css" />
<!-- font Awesome -->
<link href="${css_url}/font-awesome.min.css" rel="stylesheet" type="text/css" />
<!-- Ionicons -->
<link href="${css_url}/ionicons.min.css" rel="stylesheet" type="text/css" />
<!-- Morris chart -->
<link href="${css_url}/morris/morris.css" rel="stylesheet" type="text/css" />
<!-- jvectormap -->
<link href="${css_url}/jvectormap/jquery-jvectormap-1.2.2.css" rel="stylesheet" type="text/css" />
<!-- fullCalendar -->
<link href="${css_url}/fullcalendar/fullcalendar.css" rel="stylesheet" type="text/css" />
<!-- Daterange picker -->
<link href="${css_url}/daterangepicker/daterangepicker-bs3.css" rel="stylesheet" type="text/css" />
<!-- bootstrap wysihtml5 - text editor -->
<link href="${css_url}/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css" rel="stylesheet" type="text/css" />
<!-- Theme style -->
<link href="${css_url}/AdminLTE.css" rel="stylesheet" type="text/css" />

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
          <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
          <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->
</head>
<body class="skin-blue fixed">
	<tiles:insertAttribute name="header" />
	<div class="wrapper row-offcanvas row-offcanvas-left">
		<tiles:insertAttribute name="menu" />
		<tiles:insertAttribute name="body" />
	</div>

	<!-- jQuery 2.0.2 -->
	<script src="${js_url}/jquery.min.js"></script>
	<!-- jQuery UI 1.10.3 -->
	<script src="${js_url}/jquery-ui.min.js" type="text/javascript"></script>
	<!-- Bootstrap -->
	<script src="${js_url}/bootstrap.min.js" type="text/javascript"></script>
	<!--     Morris.js charts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
	<script src="${js_url}/plugins/morris/morris.min.js" type="text/javascript"></script>
	<!--     Sparkline -->
	<script src="${js_url}/plugins/sparkline/jquery.sparkline.min.js" type="text/javascript"></script>
	<!--     jvectormap -->
	<script src="${js_url}/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js" type="text/javascript"></script>
	<script src="${js_url}/plugins/jvectormap/jquery-jvectormap-world-mill-en.js" type="text/javascript"></script>
	<!--     fullCalendar -->
	<script src="${js_url}/plugins/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
	<!--     jQuery Knob Chart -->
	<script src="${js_url}/plugins/jqueryKnob/jquery.knob.js" type="text/javascript"></script>
	<!--     daterangepicker -->
	<script src="${js_url}/plugins/daterangepicker/daterangepicker.js" type="text/javascript"></script>
	<!--     Bootstrap WYSIHTML5 -->
	<script src="${js_url}/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js" type="text/javascript"></script>
	<!--     iCheck -->
	<script src="${js_url}/plugins/iCheck/icheck.min.js" type="text/javascript"></script>
	<!--     AdminLTE App -->
	<script src="${js_url}/AdminLTE/app.js" type="text/javascript"></script>
	<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
	<script src="${js_url}/AdminLTE/dashboard.js" type="text/javascript"></script>

	<!-- AdminLTE for demo purposes -->
	<script src="${js_url}/AdminLTE/demo.js" type="text/javascript"></script>
</body>
</html>