package ex1;

public class ByteOverflow {

	public static void main(String[] args) {
		
		byte b = 0;		//byte�� ���� b�� �����ϰ� 0���� �ʱ�ȭ
		int i = 0;		//int�� ���� i�� �����ϰ� 0���� �ʱ�ȭ
		
		for(int x=0; x<270; x++) {		//for�� - int�� ���� x�� �����ϰ� 0���� �ʱ�ȭ,"x�� 270���� ������"��� ����, x�� 1�� ����
			System.out.print(b++);		//b�� 0���� ���. ���� �Ŀ� b�� ���� 1����. byte�� 127�����ۿ� ���� ���� �� ��� ���� �ʰ��ϸ� �ְ�ȴ�.
			System.out.print("\t");		//tab��ŭ ������ �ش�
			System.out.println(i++);	//i�� 0���� ���. ���� �� i�� ���� 1����. �ٽ� 10�� �ٷ� ���ư��� ���� ���϶����� �ݺ�����.

		}
		
		
	}

}
