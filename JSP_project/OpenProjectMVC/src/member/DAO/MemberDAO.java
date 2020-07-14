package member.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import member.model.Member;

public class MemberDAO {
	
	private MemberDAO() {}
	
	private static MemberDAO dao = new MemberDAO();
	public static MemberDAO getInstance() {
		return dao;
	}
	
	
	public int insertMember(Connection conn, Member member) throws SQLException {
		
		int resultCnt = 0;
		
		PreparedStatement pstmt = null;
		String sql = "INSERT INTO member (uid, upw, uname, uphoto) VALUES (?,?,?,?)";
		
		try {
			
			pstmt = conn.prepareStatement(sql);
			pstmt.setString(1, member.getUid());
			pstmt.setString(2, member.getUpw());
			pstmt.setString(3, member.getUname());
			pstmt.setString(4, member.getUphoto());
		
			resultCnt = pstmt.executeUpdate();
			
		} finally {
			if(pstmt!=null) {
				pstmt.close();
			}
			
		}
		
		return resultCnt;
	}
	
	
	
}
