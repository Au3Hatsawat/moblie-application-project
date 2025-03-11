import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Cell from "./Cell";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CellData } from "@/utils/generateBoard";

interface BoardProps {
    gameStarted : boolean;
    startButtonAnim : Animated.Value;
    startGame : () => void;
    board : CellData[][];
    COLS : number;
    ROWS : number;
    gameStatus : (row: number, col: number) => void;
    toggleFlag : (row: number, col: number) => void;
    blockSize : number;
}


const MineSweeperBoard = ({gameStarted , startButtonAnim , startGame , board , COLS , ROWS , gameStatus , toggleFlag , blockSize}: BoardProps) => {
    return (
        <View style={[styles.board, {
            width: "100%",
        }]}>

            {!gameStarted && (
                <Animated.View style={[styles.startButton, {
                    opacity: startButtonAnim,
                    transform: [{
                        translateY: startButtonAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-50, 0],
                        })
                    }]
                }]}>
                    <TouchableOpacity onPress={startGame} style={styles.startButton}>
                        <FontAwesome name="play-circle" size={80} color={'rgba(0,0,0,0.5)'} />
                    </TouchableOpacity>
                </Animated.View>
            )}

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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FEFAE0" },
    title: { flex: 1, fontSize: 24, justifyContent: 'center', fontWeight: "bold", marginBottom: 20, paddingHorizontal: 10 },
    mineSweeper: { flex: 9, justifyContent: "center", alignItems: "center", width: "100%" },
    board: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    status: {
        // flex: 1,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton: {
        position: 'absolute',
        left: 90,
        transform: [{ translateY: -40 }],
        zIndex: 10,
    },
    startButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});

export default MineSweeperBoard;