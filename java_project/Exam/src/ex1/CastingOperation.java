package ex1;

public class CastingOperation {

	public static void main(String[] args) {
		char ch1 ='A';	//����Ÿ���� ���� ch1����, �ʱ�ȭ�ؼ� 'A'����
		char ch2 = 'Z';
		
		int num1 = ch1;	//ch1 char -> int (����ȯ �Ͼ)
		int num2 = (int)ch2;	//���������ȯ
		
		System.out.println("����A�� �����ڵ� ��:"+num1);	//�����ڵ� �� ���ڿ� ���
		System.out.println("����Z�� �����ڵ� ��:"+num2);	//�����ڵ� �� ���ڿ� ���
		
	}

}
