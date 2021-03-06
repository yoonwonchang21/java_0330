package phoneBook_ver_7_2;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class Dao_PhoneInfo {

	int typeNum=0;
	int resultCnt = 0;
	
	// 1.입력 완
	public int pbInsert(Dto_PhoneInfo info) {

		// JDBC 사용 객체
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int rsCnt = 0;

		try {
			// Connection 객체 
			conn = ConnectionProvider.getConnection();

			String sql = "insert into phonebook (pbidx, pbname, PbNumber, Pbaddr, pbmail, pbtype, "
						+ "pbmajor, pbgrade, "
						+ "pbcomname, pbcomdept, pbcomjob, "
						+ "pbcafename, pbcafenickname) "
						+ "values (PHONEBOOK7_SEQ.nextval, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

			pstmt = conn.prepareStatement(sql);

			pstmt.setString(1, info.getPbname());
			pstmt.setString(2, info.getPbNumber());
			pstmt.setString(3, info.getPbaddr());
			pstmt.setString(4, info.getPbmail());
			pstmt.setString(5, info.getPBType());
			pstmt.setString(6, info.getPbmajor());
			pstmt.setInt(7, info.getPbgrade());
			pstmt.setString(8, info.getPbcomName());
			pstmt.setString(9, info.getPbComDept());
			pstmt.setString(10, info.getPbComJob());
			pstmt.setString(11, info.getPbcafeName());
			pstmt.setString(12, info.getPbNickName());
			

			rsCnt = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			// 4. 데이터베이스 연결 종료
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}

		}

		return rsCnt;

	}

	// 2.검색 완
	public List<Dto_PhoneInfo> pbSearch(String searchName) {

		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		List<Dto_PhoneInfo> pbList = new ArrayList<>();

		try {
			conn = ConnectionProvider.getConnection();

			String sql = "select * from phonebook where pbname=?";

			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, searchName);

			rs = pstmt.executeQuery();

			while (rs.next()) {
				
				pbList.add(new Dto_PhoneInfo(rs.getInt("pbidx"), rs.getString("pbname"), rs.getString("pbnumber"),
						rs.getString("pbaddr"), rs.getString("pbmail"), rs.getString("pbtype"), rs.getString("pbmajor"), rs.getInt("pbgrade"),
						rs.getString("pbcomName"), rs.getString("pbcomdept"), rs.getString("pbcomjob"), rs.getString("pbcafename"), rs.getString("pbcafenickname")));

			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}
		return pbList;

	}

	// 3.삭제 완
	public int pbDelete(String searchName) {

		Connection conn = null;
		Statement stmt = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int resultCnt = 0;

		try {
			conn = ConnectionProvider.getConnection();

			String sql = "delete from phonebook where pbname=?";

			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, searchName);

			resultCnt = pstmt.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return resultCnt;

	}

	// 4.수정-회사
	public int pbComEdit(String searchName, String newPhoneNum, String newAddr, String newEmail, String newComName, String newComDept, String newComJob, Connection conn) {

		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			
			conn = ConnectionProvider.getConnection();

			String sql = "update phonebook set pbnumber=?, pbaddr=?, pbmail=?, "
					+ "pbcomname=?, pbcomdept=?, pbcomjob=? "
					+ "where pbname=?";

			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, newPhoneNum);
			pstmt.setString(2, newAddr);
			pstmt.setString(3, newEmail);
			pstmt.setString(4, newComName);
			pstmt.setString(5, newComDept);
			pstmt.setString(6, newComJob);
			pstmt.setString(7, searchName);

			resultCnt = pstmt.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}

		return resultCnt;

	}
	//4. 수정-학교
	public int pbUnivEdit(String searchName, String newPhoneNum, String newAddr, String newEmail, String newMajor, int newGrade, Connection conn) {
	
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			
			conn = ConnectionProvider.getConnection();

			String sql = "update phonebook set pbnumber=?, pbaddr=?, pbmail=?, pbmajor=?, pbgrade=? where pbname=?";

			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, newPhoneNum);
			pstmt.setString(2, newAddr);
			pstmt.setString(3, newEmail);
			pstmt.setString(4, newMajor);
			pstmt.setInt(5, newGrade);
			pstmt.setString(6, searchName);

			resultCnt = pstmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}

		}

		return resultCnt;

	}
	
	
	//4. 수정-동호회
	public int pbCafeEdit(String searchName, String newPhoneNum, String newAddr, String newEmail, String newCafeName, String newNickName, Connection conn) {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {
			
			conn = ConnectionProvider.getConnection();

			String sql = "update phonebook set pbnumber=?, pbaddr=?, pbmail=?, "
			+ "pbcafename=?, pbcafenickname=? "
			+ "where pbname=?";

			pstmt = conn.prepareStatement(sql);
			
			pstmt.setString(1, newPhoneNum);
			pstmt.setString(2, newAddr);
			pstmt.setString(3, newEmail);
			pstmt.setString(4, newCafeName);
			pstmt.setString(5, newNickName);
			pstmt.setString(6, searchName);

			resultCnt = pstmt.executeUpdate();

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}

		return resultCnt;

	}
	
	
	
	

	// 5.전체보기 완
	public List<Dto_PhoneInfo> pbShowAll() {

		// VO : Value Object , read only , getter
		// DTO : Data Transfer Object getter/setter , toString, equals

		Connection conn = null;
		Statement stmt = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		List<Dto_PhoneInfo> pbList = new ArrayList<>();

		try {
			conn = ConnectionProvider.getConnection();

			String sql = "select * from phonebook order by pbidx";
			
			pstmt = conn.prepareStatement(sql);


			rs = pstmt.executeQuery();

			while (rs.next()) {

				Dto_PhoneInfo info = new Dto_PhoneInfo(
												rs.getInt("pbidx"), 
												rs.getString("pbname"), 
												rs.getString("pbnumber"),
												rs.getString("pbaddr"), 
												rs.getString("pbmail"),
												rs.getString("pbtype"),
												rs.getString("pbmajor"), 
												rs.getInt("pbgrade"),
												rs.getString("pbcomName"),
												rs.getString("pbcomdept"),
												rs.getString("pbcomjob"),
												rs.getString("pbcafename"),
												rs.getString("pbcafenickname")
												
												);

				pbList.add(info);

			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

			if (stmt != null) {
				try {
					stmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		}

		return pbList;

	}


	///////////폰북타입 숫자로 찾기 메서드(리턴:int)
	public int searchTypeNum(String searchName) {
		
		Connection conn = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		String pbtype=null;
		int typeNum = 0;
		
		
		try {
			conn=ConnectionProvider.getConnection();
			
			String sql = "select pbtype from phonebook where pbname=?";
			
			pstmt=conn.prepareStatement(sql);
			pstmt.setString(1, searchName);
			
			rs=pstmt.executeQuery();
			
			while(rs.next()) {
				
				pbtype=rs.getString("pbtype");
			}
			
			if(pbtype.equals("com")) {
				typeNum=1;
			}else if(pbtype.equals("univ")) {
				typeNum=2;
			}else if(pbtype.equals("cafe")) {
				typeNum=3;
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (conn != null) {
				try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		return typeNum;
	}
	
	
	//////서치 네임메서드
	public Dto_PhoneInfo searchName(String name, Connection conn) {
		
		Dto_PhoneInfo info=null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			
			String sql = "select * from phonebook where pbname=?";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, name);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				info = new Dto_PhoneInfo(rs.getInt(1),
									rs.getString(2),
									rs.getString(3),
									rs.getString(4),
									rs.getString(5),
									rs.getString(6),
									rs.getString(7),
									rs.getInt(8),
									rs.getString(9),
									rs.getString(10),
									rs.getString(11),
									rs.getString(12),
									rs.getString(13));
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return info;
		
	}
	
	///////서치 카운트메서드
	public int searchNameCnt(String name, Connection conn) {
		
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		int existCnt = 0;
		
		
		try {
			
			String sql = "select count(*) from phonebook where pbname=?";
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, name);
			
			rs = pstmt.executeQuery();
			
			if(rs.next()) {
				existCnt= rs.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return existCnt;
	}
	

}
