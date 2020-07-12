<%@page import="dao.EmpDAO"%>
<%@page import="jdbc.ConnectionProvider"%>
<%@page import="model.Emp"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>empList</title>
<style>
	table {
		width: 80%;
	}
	table td {
		padding: 10px;
		text-align:center;
	}
	
</style>
</head>
<body>
	<%
		// 1. 드라이버 로드
		// 2. Connection 생성
		// 3. Statement
		// 4. Result Set
		// 5. close();
	
		// 1. DB 로드
		//Class.forName("oracle.jdbc.driver.OracleDriver");
		
		// JSP내에서는 지역변수 (초기화필요)
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		List<Emp> empList = new ArrayList<>();
		
		// DB Connection 정보
		//String dbUrl = "jdbc:oracle:thin:@localhost:1521:orcl";
		//String user = "scott";
		//String pw = "tiger";
		
		try {
			// 2. Connection 생성
			//conn = DriverManager.getConnection(dbUrl, user, pw);
			conn=ConnectionProvider.getConnection();
			
			empList = EmpDAO.getInstance();
			
			// 3. Statement 생성
			/* stmt = conn.createStatement();
			
			// 실행할 수 있는 SQL문 
			String sql = "select * from emp order by ename desc"; 

			// sql문 결과를 ResultSet 객체에 담는다.
			rs = stmt.executeQuery(sql);
			
			//결과 출력
			while(rs.next()){
				
				empList.add(new Emp(rs.getInt("empno"),
									rs.getString("ename"),
									rs.getInt("sal"), 
									rs.getString("job")
									)
							);
			}
		
		} catch (SQLException ex){
			//예외처리
		} finally {
			rs.close();
			stmt.close();
			conn.close();
		}
		 */
		 
		request.setAttribute("empList", empList);
	%>

	<jsp:forward page="empList_view.jsp"/>


</body>
</html>