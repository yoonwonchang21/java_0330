<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="<c:url value="/CSS/default.css"/>"> 
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->

</head>
<body>

	<%@ include file="/WEB-INF/views/include/header.jsp"%>
	
	<h3>수정할 정보를 입력해주세요.</h3>
	
	<form id="editForm" action="editMember.do?idx=${param.idx}" method="post" onsubmit="return nextStep();">
		<input type="hidden" name="idx" value="${param.idx}">
		▶ 새 비밀번호 <input type="password" name="newPw"><br>
		▶ 새 프로필 사진 <input type="file" name="newPhoto"><br>
		<input type="submit" value="수정하기">
		
		<%-- <c:redirect url="editMember.do">
			<c:param name="idx" value="${param.idx}"/>
		</c:redirect> --%>
	
	</form>
	<%@ include file="/WEB-INF/views/include/footer.jsp"%>


</body>
</html>


