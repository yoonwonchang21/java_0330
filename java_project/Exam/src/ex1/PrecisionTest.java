package ex1;

public class PrecisionTest {

	public static void main(String[] args) {
		
		float f = 1.2345678901234567890f;	//���̻�f�� �ٿ����� ������ ������ ������ �����.
		double d = 1.2345678901234567890;	//�Ǽ��� �⺻���� double�̱� ������ ���̻�d�� ���� ����
		float f2 = 0.100000001f;			//���̻�f�� �ٿ����� ������ ������ ������ �����.		
		double d2 = 0.100000001;			//�Ǽ��� �⺻���� double�̱� ������ ���̻�d�� ���� ����
		double d3 = 0.1000000000000001;		//�Ǽ��� �⺻���� double�̱� ������ ���̻�d�� ���� ����
		
		System.out.println(f);
		System.out.println(d);
		System.out.println(f2);
		System.out.println(d2);
		System.out.println(d3);
		
	}

}
