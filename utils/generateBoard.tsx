export interface CellData {
    isMine: boolean;
    revealed: boolean;
    neighborMines: number;
    flagged : boolean;
  }
  
  export function generateBoard(rows: number, cols: number, mines: number): CellData[][] {
    let board: CellData[][] = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({
        isMine: false,
        revealed: false,
        neighborMines: 0,
        flagged : false
      }))
    );
  
    let mineCount = 0;
    while (mineCount < mines) {
      let row = Math.floor(Math.random() * rows);
      let col = Math.floor(Math.random() * cols);
  
      if (!board[row][col].isMine) {
        board[row][col].isMine = true;
        mineCount++;
      }
    }
  
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c].isMine) continue;
  
        let count = 0;
        for (let [dr, dc] of directions) {
          let nr = r + dr;
          let nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
            count++;
          }
        }
        board[r][c].neighborMines = count;
      }
    }
  
    return board;
  }
  