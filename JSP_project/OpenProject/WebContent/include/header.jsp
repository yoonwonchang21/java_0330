<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<h1 id="header">Open Project</h1>
	<ul id="nav">
		<li><a href="<%= request.getContextPath() %>/member/memberRegForm.jsp">회원가입</a></li>
		<li><a href="<%= request.getContextPath() %>/member/memberLoginForm.jsp">로그인</a></li>
		<li><a href="<%= request.getContextPath() %>/member/myPage/myPage.jsp">마이페이지</a></li>
		<li><a href="<%= request.getContextPath() %>/guestBook/list.jsp">방명록(비회원)</a></li>
		<li><a href="<%= request.getContextPath() %>/board/list.jsp">게시판(회원제)</a></li>
	</ul>