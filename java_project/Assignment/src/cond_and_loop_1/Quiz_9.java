package cond_and_loop_1;

public class Quiz_9 {
	public static void main(String[] args) {
		
		int num=1;
		int result=1;
		
		for(int i=1; i<=10; i++) {
			result=result*(num * i);
		}
		System.out.println("1부터 10까지 곱한 값은 : "+result);
		
//		int gob=1;
//		for(int k=1; k<=10;k++)
//			gob *=k;				→복합대입연산
//		
//		System.out.println(gob);
		
		
	}
}