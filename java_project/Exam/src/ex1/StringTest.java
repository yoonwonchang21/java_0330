package ex1;

public class StringTest {

	public static void main(String[] args) {

		double dd = 1D;
		String a = 7 + " ";		//���ڿ�7�� " "�� ���
		String b = " "+ 7;		//���ڿ�" "�� 7�� ���
		String c = 7 + "";		//���ڿ� 7 ���
		String d = ""+ 7;		//���ڿ� 7 ���
		String e = ""+"";		//���ڿ������� ��¾���
		String f = 7 + 7 +"";	//int������ 7+7 ���ϱ� ���� �� ���ڿ� ���
		String g = ""+ 7 + 7;	//���ڿ��� ��ȯ �� 7�� 7 ���ڿ��� ���
		System.out.println(a);
		System.out.println(b);
		System.out.println(c);
		System.out.println(d);
		System.out.println(e);
		System.out.println(f);
		System.out.println(g);
		
	}

}
