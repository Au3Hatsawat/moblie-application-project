import { StyleSheet, Text, Pressable, View } from "react-native";
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface GameStatusProps {
    flag: number;
    time: number;
    mode: string;
    mine: number;
    resetGame: () => void;
}

const GameStatus = ({ flag, time, mode, mine, resetGame }: GameStatusProps) => {
    // Helper function to determine difficulty color
    const getDifficultyColor = (mode: string) => {
        switch(mode) {
            case "EASY": return "#4CAF50";
            case "MEDIUM": return "#2196F3";
            case "HARD": return "#F44336";
            default: return "#4CAF50";
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.statsGrid}>
                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <FontAwesome5 name="bomb" size={16} color="#D0E1F9" />
                        <Text style={styles.statLabel}>MINES</Text>
                    </View>
                    <Text style={styles.statValue}>{mine}</Text>
                </View>
                
                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <Ionicons name="time-outline" size={16} color="#D0E1F9" />
                        <Text style={styles.statLabel}>TIME</Text>
                    </View>
                    <Text style={styles.statValue}>{time}</Text>
                </View>
                
                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <FontAwesome5 name="flag" size={16} color="#D0E1F9" />
                        <Text style={styles.statLabel}>FLAGS</Text>
                    </View>
                    <Text style={styles.statValue}>{flag}</Text>
                </View>
                
                <View style={styles.statItem}>
                    <View style={styles.statHeader}>
                        <FontAwesome5 name="gamepad" size={16} color="#D0E1F9" />
                        <Text style={styles.statLabel}>MODE</Text>
                    </View>
                    <Text style={[styles.statValue, { color: getDifficultyColor(mode) }]}>
                        {mode}
                    </Text>
                </View>
            </View>
            
            <Pressable 
                style={styles.resetButton}
                onPress={resetGame}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
            >
                <FontAwesome5 name="redo-alt" size={16} color="#fff" style={{marginRight: 8}} />
                <Text style={styles.resetButtonText}>RESTART GAME</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    statItem: {
        width: '48%',
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    statLabel: {
        color: '#D0E1F9',
        fontSize: 14,
        marginLeft: 8,
        opacity: 0.8,
    },
    statValue: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#F44336',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: 'row',
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
    resetButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});

export default GameStatus;