<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>

	<h1>안녕하세요. pageControl 페이지입니다. </h1>

	<%
		response.sendRedirect("../hello.jsp"); 
	%>

	<%-- <jsp:forward page="../hello.jsp"/> --%>


</body>
</html>