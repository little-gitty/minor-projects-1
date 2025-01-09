public class Nqueen {
    public static void main(String[] args) {
        int N = 4;
        int[][] board = new int[N][N];
        FourQueen q = new FourQueen();
        q.solveNQUtil(board, 0);
        q.printSolution(board);
    }
}
