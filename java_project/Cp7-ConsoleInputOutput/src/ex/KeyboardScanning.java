package ex;

import java.util.Scanner;

public class KeyboardScanning {
	public static void main(String[] args) {
		
		//import 단축키 ctrl+shift+O
		Scanner sc = new Scanner(System.in);
		
		System.out.println("숫자를 입력해주세요.");
		int num1 = sc.nextInt();
		
		System.out.println("숫자를 입력해주세요.");
		int num2 = sc.nextInt();
		
		System.out.println("숫자를 입력해주세요.");
		int num3 = sc.nextInt();
		
		int sum = num1 + num2 + num3;
		System.out.printf("입력된 정수 %d, %d, %d 입니다. 숫자들의 합은 %d입니다."
						,num1, num2, num3, sum);
		
	}
}
