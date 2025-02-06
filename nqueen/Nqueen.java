
public class Nqueen {
    int        N;
    int[][]    board;

    /*set the number of queen and square board for each particular task */
    public void settask(int N) {
        this.N  = N;
        board   = new int[N][N];
    }

    /* A function to print solution */
    void printSolution() {
        for(int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(" " + board[i][j] + " ");
            System.out.println();
        }
    }

    /* A function to check if a queen can
        be placed on board. Note that this
        function is called when "col" queens are
        already placed in columns from 0 to col -1.
        So we need to check only left side for
        attacking queens */
    boolean isSafe( int row, int col) {
        int i, j;

        // Check this row on left side
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;

        // Check upper diagonal on left side
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;

        // Check lower diagonal on left side
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;

        return true;
    }

    /* A recursive utility function to solve N
        Queen problem */
    boolean solveNQUtil( int col) {
        /* base case: If all queens are placed
            then return true */
        if (col >= N)
            return true;

        /* Consider this column and try placing
            this queen in all rows one by one */
        for (int i = 0; i < N; i++) {
            /* Check if the queen can be placed on
                board[i][col] */
            if (isSafe( i, col)) {
                /* Place this queen in board[i][col] */
                board[i][col] = 1;

                /* recur to place rest of the queens */
                if (solveNQUtil( col + 1) == true)
                    return true;

                /* If placing queen in board[i][col]
                    doesn't lead to a solution then
                    remove queen from board[i][col] */
                board[i][col] = 0; // BACKTRACK
            }
        }

        /* If the queen cannot be placed in any row in
            this column col then return false */
        return false;
    }
}

