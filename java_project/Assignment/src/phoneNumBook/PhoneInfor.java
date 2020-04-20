package phoneNumBook;

import java.util.Scanner;

public class PhoneInfor {

	//String타입 static변수 선언 - 자동초기값은 null 
	static String name;
	static String phoneNum;
	static String bDay;

	//생성자
	PhoneInfor(String name, String number, String bDay){
		this.name=name;
		phoneNum=number;
		this.bDay=bDay;
	}
	
	//생성자(without bDay)
	PhoneInfor(String name, String number){
		this.name=name;
		phoneNum=number;
	}
	
	//정보 입력 메서드
	public static void input_Info(){
		Scanner sc = new Scanner(System.in);
		
		System.out.println("이름 입력 : ");
		name=sc.next();
		System.out.println("전화번호 입력 : ");
		phoneNum=sc.next();
		while(true) {
			System.out.println("생일입력 동의? 1.동의 2.동의 안함");
			int opt=sc.nextInt();
			if(opt==1) {
				System.out.println("생일 입력 : ");
				bDay=sc.next();
				break;
			}else if(opt==2) {
				bDay=sc.nextLine();
				break;
			}else {System.out.println("다시 선택하세요.");}
			}
	}
	

	
	//정보 출력 메서드
	static void show_Info() {
		System.out.println("이름 : "+name+", 전화번호 : "+phoneNum+", 생일 :"+bDay);
		
	}
	
	//메인메서드
	public static void main(String[] args) {
		//인스턴스 생성
		PhoneInfor info = new PhoneInfor(name, phoneNum, bDay);
		//생성된 인스턴스로 메서드호출
		while(true) {
		info.input_Info();
		info.show_Info();
		}
		
	}
	
	
}