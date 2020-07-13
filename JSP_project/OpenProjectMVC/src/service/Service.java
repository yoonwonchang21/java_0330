package service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface Service {

	// 멤버 메서드가 모두 추상메서드! : public static abstract 생략 가능
	// 멤버 변수가 모두 상수!
	
	// ▶ view page 반환 메서드 
	// 1) 사용자 요청의 핵심처리 
	// 2) request속성에 데이터 저장
	String getViewPage(HttpServletRequest request, HttpServletResponse response);
	
	
}
