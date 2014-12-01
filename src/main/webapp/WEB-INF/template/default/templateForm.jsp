<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib prefix="util" tagdir="/WEB-INF/tags/util"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>

<tiles:importAttribute name="jsList" />
<tiles:importAttribute name="cssList" />

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>AdminLTE | Dashboard</title>
<meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
<c:forEach var="css" items="${cssList}">
	<link rel="stylesheet" type="text/css" href="<c:url value="${css}"/>">
</c:forEach>
</head>
<body class="skin-black fixed">
	<c:forEach var="script" items="${jsList}">
		<script src="<c:url value="${script}"/>"></script>
	</c:forEach>
	<tiles:insertAttribute name="header" />
	<div class="wrapper row-offcanvas row-offcanvas-left">
		<tiles:insertAttribute name="menu" />
		<tiles:insertAttribute name="body" />
	</div>

</body>
</html>