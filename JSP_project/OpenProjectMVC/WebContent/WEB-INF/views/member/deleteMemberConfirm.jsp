<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page trimDirectiveWhitespaces="true" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>delete confirm</title>
<link rel="stylesheet" href="<c:url value="/CSS/default.css"/>"> 
<script>

	/* var form = document.getElementById("delForm"); */
	
	function check(){
		
		if(confirm('삭제하시겠습니까?')){
			return true;
		}
		
		return false;
	}
	
	
</script>
</head>
<body>

		<%@ include file="/WEB-INF/views/include/header.jsp"%>
	

	<h3>회원정보를 삭제를 하시려면 비밀번호를 입력해주세요.</h3>
	<form id="delForm" action="deleteMember_view.do" method="post" onsubmit="return check();">
		비밀번호 <input type="password" name="chkPw">
		<input type="hidden" name="idx" value="${param.idx}">
		<input type="submit" value="삭제하기">
	</form>
	
	
	
	
		<%@ include file="/WEB-INF/views/include/footer.jsp"%>
</body>
</html>
