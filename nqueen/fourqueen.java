import java.util.Scanner;

public class fourqueen {
    public static void main(String[] args) {
        int N ;
        N=input("Enter the number of queens");
        Nqueen q = new Nqueen();
        q.settask(N);
        for (int i = 0; i < N; i++) {
            q.solveNQUtil(i);
        }
        
        q.printSolution();
    }
    static int input(String s){
        Scanner sc=new Scanner(System.in);  
        System.out.println(s);
        int res= sc.nextInt();
        sc.close();
        return res;
    }
}
