public class fourqueen {
    public static void main(String[] args) {
        int N = 8;
        // int[][] board = new int[N][N];
        Nqueen q = new Nqueen();
        q.set(N);
        q.solveNQUtil( 0);
        q.printSolution();
    }
}
