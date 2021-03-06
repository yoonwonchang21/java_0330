<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	request.setCharacterEncoding("utf-8");
%>
<jsp:useBean id="requestInfo" class="model.RequestMemberInfo"/>
<jsp:setProperty property="*" name="requestInfo"/>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입 정보 출력</title>
</head>
<body>

	<h1>회원가입 처리 페이지</h1>
	<hr>
	<table border="1">
		<tr>
			<td>아이디(이메일)</td>
			<td><%= requestInfo.getId() %><%--= request.getParameter("id") --%></td>
		</tr>	
		<tr>
			<td>비밀번호</td>
			<td><%= requestInfo.getPw() %><%--= request.getParameter("pw") --%></td>
		</tr>	
		<tr>
			<td>이름</td>
			<td><%= requestInfo.getUname() %><%--= request.getParameter("uname") --%></td>
		</tr>	
		<%-- <tr>
			<td>사진</td>
			<td>= request.getParameter("uphoto")</td>
		</tr>	
		<tr>
			<td>요청 메서드</td>
			<td><%= request.getMethod() %></td>
		</tr>
		<tr>
			<td>쿠키 정보</td>
			<td><%= request.getCookies() %></td>
		</tr>
		<tr>
			<td>요청 정보 URL</td>
			<td>
				<%= request.getProtocol() %><br>
				URL : <%= request.getRequestURL() %><br>
				URI : <%= request.getRequestURI() %>
			</td>
		</tr> --%>
	
	</table>

</body>
</html>