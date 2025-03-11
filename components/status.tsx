import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GameStatusProps {
    flag: number;
    time: number;
    mode: string;
    mine: number;
    resetGame: () => void;
}

const GameStatus = ({ flag, time, mode, mine, resetGame }: GameStatusProps) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%', padding: 20, justifyContent: 'space-between', gap: 10 }}>
                <View>
                    <Text style={{ fontSize: 25, color: '#a8b0b2', fontWeight: 'semibold' }}>
                        MINES
                    </Text>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
                        {mine}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 25, color: '#a8b0b2', fontWeight: 'semibold' }}>
                        TIMES
                    </Text>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
                        {time}
                    </Text>
                </View>
                <View style={{flexDirection:"row" ,justifyContent: 'center'}}>
                    <View>
                        <Text style={{fontSize : 30, justifyContent: 'center' , fontWeight: 'bold'}}>'RESTART</Text>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {resetGame()}}>
                        <Text style={styles.buttonText}>RESTART</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={{ fontSize: 25, color: '#a8b0b2', fontWeight: 'semibold' }}>
                        FLAGS
                    </Text>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                        {flag}
                    </Text>
                </View>
                <View>
                    <Text style={{ fontSize: 25, color: '#a8b0b2', fontWeight: 'semibold' }}>
                        MODE
                    </Text>
                    <Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold'}}>
                        {mode}
                    </Text>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FEFAE0" },
    title: { flex: 1, fontSize: 24, justifyContent: 'center', fontWeight: "bold", marginBottom: 20, paddingHorizontal: 10 },
    mineSweeper: { flex: 9, justifyContent: "center", alignItems: "center", width: "100%" },
    board: {
        // flex: 10,
        // marginVertical : 20,
        // backgroundColor : 'red',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical : 100,
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
    button: {
        width: 60,
        height: 60,
        backgroundColor: "red",
        borderRadius: 30, 
        alignItems: "center",
        justifyContent: "center",
    
        elevation: 8,
      },
      buttonText: {
        color: "white",
        fontSize:12,
        fontWeight: "bold",
        elevation: 8
      },
});

export default GameStatus;