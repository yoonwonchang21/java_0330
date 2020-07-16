<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>deleteMessage_view</title>
<link rel="stylesheet" href="<c:url value="/CSS/default.css"/>"> 
<script>

	alert("${resultMsg}");
	alert("회원리스트로 돌아갑니다.");
	location.href="memberList.do";
	
</script>
</head>
<body>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
	
	<%-- <c:if test="${statusCode eq 1}">
		<h1>회원 계정이 정상적으로 삭제되었습니다.</h1>
	</c:if>
	<c:if test="${statusCode eq -1}">
		<h1>삭제할 회원정보가 존재하지 않습니다.</h1>
	</c:if>
	<c:if test="${statusCode eq -2}">
		<h1>비밀번호가 일치하지 않습니다.</h1>
	</c:if> --%>
	
	
	
	<!-- <a href="memberList.jsp">리스트 보기</a> -->
	
	<%@ include file="/WEB-INF/views/include/footer.jsp"%>
	
</body>
</html>