import { StyleSheet, StatusBar, Dimensions, Animated, Easing, View, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MineSweeperBoard from "@/components/board";
import GameStatus from "@/components/status";
import { useAppState } from "../../store/StateContext";

// const ROWS = 8, COLS = 8, MINES = 10, FLAGS = 10, TIMES = 0;

export default function GameScreen() {

    const {ROWS, COLS, MINES, FLAGS, MODE} = useAppState();

    const { width, height } = Dimensions.get('window');
    const blockSize = Math.floor(width / COLS);
    const [board, setBoard] = useState(generateBoard(ROWS, COLS, MINES));
    const [gameOver, setGameOver] = useState(false);
    const [time, setTime] = useState(0);
    const [flag, setFlag] = useState(FLAGS);
    const [totalSpace, setTotalSpace] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const startButtonAnim = useRef(new Animated.Value(1)).current;


    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (gameStarted && time >= 0) {
            timer = setInterval(() => { setTime(prevTime => prevTime + 1); }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameStarted, time]);

    const revealCell = (row: number, col: number) => {
        try {
            if (row >= ROWS || col >= COLS) return;
            if (gameOver || board[row][col].revealed) return;
            let newBoard = [...board];
            newBoard[row][col] = { ...newBoard[row][col], revealed: true };
            setTotalSpace((prev) => prev + 1);
            if (newBoard[row][col].flagged) {
                setFlag((prev) => prev + 1);
            }
            if (newBoard[row][col].isMine) {
                return;
            } else if (newBoard[row][col].neighborMines) {
                newBoard[row][col] = { ...newBoard[row][col], revealed: true };
            } else {
                revealCell(row - 1, col - 1);
                revealCell(row - 1, col);
                revealCell(row - 1, col + 1);
                revealCell(row, col + 1);
                revealCell(row, col - 1);
                revealCell(row + 1, col + 1);
                revealCell(row + 1, col);
                revealCell(row + 1, col - 1);
            }

            setBoard(newBoard);
        } catch (error) {
            return;
        }
    };

    const startGame = () => {
        Animated.timing(startButtonAnim, {
            toValue: 0,
            duration: 500,
            easing: Easing.ease,
            useNativeDriver: true,
        }).start(() => setGameStarted(true)); // ซ่อนปุ่มหลัง animation จบ
    };

    const gameStatus = (row: number, col: number) => {
        let newBoard = [...board];
        if (gameOver || board[row][col].revealed) return;
        startGame();

        if (board[row][col].isMine) {
            newBoard[row][col] = { ...newBoard[row][col], revealed: true };
            alert("Game Over! 💥");
            setGameOver(true);
        } else {
            revealCell(row, col);
            setBoard(newBoard);
        }

        if (totalSpace === (ROWS * COLS) - MINES) {
            alert("You Win! 🚩");
            setGameOver(true);
        }
    }

    const resetGame = () => {
        setBoard(generateBoard(ROWS, COLS, MINES));
        setTime(0);
        setTotalSpace(0);
        setFlag(FLAGS);
        setGameStarted(false);
        setGameOver(false);
        startButtonAnim.setValue(1);
    }

    useEffect(()=>{
        resetGame();
    },[gameOver,MODE]);


    const toggleFlag = (row: number, col: number) => {
        if (flag === 0 && !board[row][col].flagged) return;
        if (board[row][col].revealed) return;
        let newBoard = [...board];
        newBoard[row][col] = { ...newBoard[row][col], flagged: !newBoard[row][col].flagged };

        if (newBoard[row][col].flagged) {
            setFlag((prev) => prev - 1);
        } else {
            setFlag((prev) => prev + 1);
        }


        setBoard(newBoard);
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#e0e5e5" />

                <View style={{justifyContent : 'center' , alignItems: 'center', paddingHorizontal:10}}>
                    <Text style={{fontSize: 35 , fontWeight : "bold", textAlign:'center', letterSpacing: 5 , color:'#99a3a3' , paddingVertical : 20}}>
                        X MINESWEEPER X
                    </Text>
                </View>
                <MineSweeperBoard
                    COLS={COLS}
                    ROWS={ROWS}
                    blockSize={blockSize}
                    board={board}
                    gameStarted={gameStarted}
                    gameStatus={gameStatus}
                    startButtonAnim={startButtonAnim}
                    startGame={startGame}
                    toggleFlag={toggleFlag}
                />


                <GameStatus 
                    flag={flag}
                    mode={MODE}
                    time={time}
                    mine={MINES}
                    resetGame={resetGame}
                />

            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#e0e5e5" },
    title: { flex: 1, fontSize: 24, justifyContent: 'center', fontWeight: "bold", marginBottom: 20, paddingHorizontal: 10 },
    mineSweeper: { flex: 9, justifyContent: "center", alignItems: "center", width: "100%" },
    board: {
        flex: 10,
        // marginVertical : 20,
        // backgroundColor : 'red',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical : 100,
    },
    status: {
        flex: 1,
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startButton: {
        position: 'absolute',
        // top: '10%',
        left: 89,
        transform: [{ translateY: -124 }],
        zIndex: 10,
    },
    startButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});
