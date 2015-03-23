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
	<!-- Bootstrap -->
	<script src="${js_url}/bootstrap.min.js" type="text/javascript"></script>
	<!--     AdminLTE App -->
	<script src="${js_url}/AdminLTE/app.js" type="text/javascript"></script>
	<!-- AdminLTE for demo purposes -->
	<script src="${js_url}/AdminLTE/demo.js" type="text/javascript"></script>
</body>
</html>