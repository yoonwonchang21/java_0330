package ver05;

//PhoneInfo클래스를 상속해서 새로운 클래스를 정의
public class PhoneCompanyInfo extends PhoneInfo{

	String company;			//회사 이름
	String department;		//부서 이름
	String position;		//직급 이름
	
	PhoneCompanyInfo(String name, String phoneNum, String address, String email, String company, String dept, String position) {
		super(name, phoneNum, address, email);
		this.company=company;
		this.department=dept;
		this.position=position;
	}

	@Override
	public void showAllInfo() {
		//super.showAllInfo();	//호출할 수 없는 상태				//2020.04.29
		super.showBasicInfo(); 		//상위클래스 메서드 호출
		System.out.println("회사 : "+this.company);
		System.out.println("부서 : "+this.department);
		System.out.println("직급 : "+this.position);
	}



}
