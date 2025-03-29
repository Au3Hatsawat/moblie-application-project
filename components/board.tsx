import { Animated, FlatList, StyleSheet, View } from "react-native";
import Cell from "./Cell";
import { CellData } from "@/utils/generateBoard";

interface BoardProps {
    gameStarted: boolean;
    startButtonAnim: Animated.Value;
    startGame: () => void;
    board: CellData[][];
    COLS: number;
    ROWS: number;
    gameStatus: (row: number, col: number) => void;
    toggleFlag: (row: number, col: number) => void;
    blockSize: number;
}

const MineSweeperBoard = ({gameStarted, startButtonAnim, startGame, board, COLS, ROWS, gameStatus, toggleFlag, blockSize}: BoardProps) => {
    return (
        <View style={[styles.board, {
            width: "100%",
        }]}>
            <FlatList
                key={COLS}
                data={board.flat()}
                keyExtractor={(item, index) => index.toString()}
                numColumns={COLS}
                renderItem={({ item, index }) => (
                    <Cell
                        data={item}
                        onPress={() => gameStatus(Math.floor(index / COLS), index % COLS)}
                        onLongPress={() => toggleFlag(Math.floor(index / COLS), index % COLS)}
                        row={Math.floor(index / COLS)}
                        col={index % COLS}
                        MAX_COL={COLS}
                        MAX_ROW={ROWS}
                        blockSize={blockSize}
                    />
                )}
                style={styles.boardList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    boardList: {
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
    }
});

export default MineSweeperBoard;