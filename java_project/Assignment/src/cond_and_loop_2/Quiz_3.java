package cond_and_loop_2;

public class Quiz_3 {
	public static void main(String[] args) {
		
		int sum = 0;
		int before_sum = 0;
		
		for (int i = 1; i <= 10; i++) {
			sum = sum+i;
			before_sum += sum;
		}
		System.out.println(before_sum);
		
//		for(int i=1; i<=10; i++) {			//문제풀이 버전
//			int k=0;
//			for(int j=1; j<=i;j++) {
//				k=k+j;
//			}
//			sum=sum+k;
//		}
//		System.out.println(sum);
		
		
		
	}
}
