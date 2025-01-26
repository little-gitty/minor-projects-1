public class Nqueen {
    public static void main(String[] args) {
        int[][] board = new int[8][8];
        FourQueen obj=new FourQueen();
        obj.solveNQUtil(board,0 );
        obj.printSolution(board);
    }
}
