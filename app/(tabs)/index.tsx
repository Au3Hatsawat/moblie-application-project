import { StyleSheet, StatusBar, Dimensions, Animated, Easing, View, Text, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import { generateBoard } from "../../utils/generateBoard";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MineSweeperBoard from "@/components/board";
import GameStatus from "@/components/status";
import { useAppState } from "../../store/StateContext";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import GameAlert from "@/components/GameAlert";
import * as Haptics from 'expo-haptics';

export default function GameScreen() {
    const { ROWS, COLS, MINES, FLAGS, MODE } = useAppState();

    const { width } = Dimensions.get('window');
    const blockSize = Math.floor(width / COLS);
    const [board, setBoard] = useState(generateBoard(ROWS, COLS, MINES));
    const [gameOver, setGameOver] = useState(false);
    const [time, setTime] = useState(0);
    const [flag, setFlag] = useState(FLAGS);
    const [totalSpace, setTotalSpace] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    
    // Alert state
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertType, setAlertType] = useState<'win' | 'lose'>('lose');
    
    // Animations
    const startButtonAnim = useRef(new Animated.Value(1)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    
    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (gameStarted && !gameOver && time >= 0) {
            timer = setInterval(() => { setTime(prevTime => prevTime + 1); }, 1000);
        }

        return () => clearInterval(timer);
    }, [gameStarted, gameOver, time]);

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
        }).start(() => setGameStarted(true));
        
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const gameStatus = (row: number, col: number) => {
        let newBoard = [...board];
        if (gameOver || board[row][col].revealed) return;
        
        if (!gameStarted) {
            startGame();
        }

        if (board[row][col].isMine) {
            // Reveal all mines when player hits one
            board.forEach((rowArr, r) => {
                rowArr.forEach((cell, c) => {
                    if (cell.isMine) {
                        newBoard[r][c] = { ...newBoard[r][c], revealed: true };
                    }
                });
            });
            
            setBoard(newBoard);
            
            // Show lose alert with slight delay for dramatic effect
            setTimeout(() => {
                setAlertType('lose');
                setAlertVisible(true);
                setGameOver(true);
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
            }, 500);
        } else {
            revealCell(row, col);
            setBoard(newBoard);
            
            // Check win condition with slight delay to ensure board updates first
            setTimeout(() => {
                if (totalSpace >= (ROWS * COLS) - MINES - 1) {
                    setAlertType('win');
                    setAlertVisible(true);
                    setGameOver(true);
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                }
            }, 300);
        }
    }

    const resetGame = () => {
        setAlertVisible(false);
        setBoard(generateBoard(ROWS, COLS, MINES));
        setTime(0);
        setTotalSpace(0);
        setFlag(FLAGS);
        setGameStarted(false);
        setGameOver(false);
        startButtonAnim.setValue(1);
    }

    useEffect(() => {
        resetGame();
    }, [MODE]);


    const toggleFlag = (row: number, col: number) => {
        if (gameOver) return;
        if (flag === 0 && !board[row][col].flagged) return;
        if (board[row][col].revealed) return;
        
        let newBoard = [...board];
        newBoard[row][col] = { ...newBoard[row][col], flagged: !newBoard[row][col].flagged };

        if (newBoard[row][col].flagged) {
            setFlag((prev) => prev - 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        } else {
            setFlag((prev) => prev + 1);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }

        setBoard(newBoard);
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#1a2639" />

                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleTop}>MINESWEEPER</Text>
                    </View>
                    <View style={styles.subtitle}>
                        <FontAwesome5 name="bomb" size={18} color="#D0E1F9" />
                        <Text style={styles.subtitleText}>CLEAR THE MINEFIELD</Text>
                    </View>
                </View>

                <Animated.View 
                    style={[
                        styles.gameContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    {!gameStarted && (
                        <Animated.View style={[styles.startButtonContainer, {
                            opacity: startButtonAnim,
                            transform: [{
                                scale: startButtonAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.5, 1],
                                })
                            }]
                        }]}>
                            <Pressable 
                                onPress={startGame} 
                                style={styles.startButton}
                                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: true }}
                            >
                                <FontAwesome5 name="play" size={30} color="#D0E1F9" />
                            </Pressable>
                        </Animated.View>
                    )}

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
                </Animated.View>

                <View style={styles.footer}>
                    <GameStatus
                        flag={flag}
                        mode={MODE}
                        time={time}
                        mine={MINES}
                        resetGame={resetGame}
                    />
                    
                    <View style={styles.swipeHint}>
                        <Text style={styles.footerText}>Swipe to access settings</Text>
                        <Ionicons name="chevron-forward" size={16} color="#D0E1F9" />
                    </View>
                </View>
                
                {/* Custom Game Alert */}
                <GameAlert 
                    visible={alertVisible}
                    type={alertType}
                    onClose={resetGame}
                />
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#1a2639",
        paddingHorizontal: 20,
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
    },
    titleContainer: {
        alignItems: 'center',
    },
    titleTop: {
        fontSize: 40,
        fontWeight: "700",
        color: '#fff',
        letterSpacing: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    subtitleText: {
        fontSize: 14,
        color: '#D0E1F9',
        marginLeft: 8,
        letterSpacing: 1.5,
    },
    gameContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        paddingVertical: 20,
    },
    startButtonContainer: {
        position: 'absolute',
        zIndex: 10,
    },
    startButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    footer: {
        paddingBottom: 20,
    },
    swipeHint: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },
    footerText: {
        color: '#D0E1F9',
        fontSize: 14,
        opacity: 0.6,
        marginRight: 5,
    },
});