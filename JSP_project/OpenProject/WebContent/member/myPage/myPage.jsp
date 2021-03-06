<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/sessionCheck.jsp" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	if(memberInfo!=null){
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>OpenProject 마이페이지</title>
<link rel="stylesheet" href="<c:url value="/CSS/default.css" context="/OP"/>">
<style>

#profile {
	margin: 10px 10px;
}

h1{
	padding: 15px 20px;
}
h2 {
	margin: 0 20px;
	padding: 10px 15px;
}
h3 {
	margin: 0 10px;
}
a.btn {
	margin: 50px 10px;
	padding: 50px 5px;
}

#profile>tbody>tr>td {
	margin: 10px 10px;
	padding: 3px 3px;
	font-weight: bold;
}

</style>
</head>
<body>
	<%@ include file="/include/header.jsp"%>
	
	<div>
		<h1>마이페이지</h1>
	</div>
		<h2>환영합니다!</h2>
	<br>
	<h3>▶ ${memberInfo.uid}님의 회원정보</h3>
	<br>
	<div class="profile">
	
		<table id="profile">
			<tr>
				<td>아이디</td>
				<td>${memberInfo.uid}</td>
			</tr>
			<tr>
				<td>비밀번호</td>
				<td>${memberInfo.upw}</td>
			</tr>
			<tr>
				<td>이름</td>
				<td>${memberInfo.uname}</td>
			</tr>
			<tr>
				<td>사진</td>
				<td>${memberInfo.uphoto}</td>
			</tr>
		</table>
	</div>
	
	<a href="<c:url value="/member/logout.jsp" context="/OP"/>" class="btn logout">로그아웃</a>
	<a href="<c:url value="/index.jsp" context="/OP"/>" class="btn main">메인으로 가기</a>
	
	
	<%@ include file="/include/footer.jsp"%>
</body>
</html>
<%
	}
%>
