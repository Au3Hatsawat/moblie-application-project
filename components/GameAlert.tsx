import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Pressable } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

interface GameAlertProps {
    visible: boolean;
    type: 'win' | 'lose';
    onClose: () => void;
}

const { width } = Dimensions.get('window');

const GameAlert = ({ visible, type, onClose }: GameAlertProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.5)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    
    useEffect(() => {
        if (visible) {
            // Play haptic feedback
            if (type === 'win') {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            } else {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                
                // Create shake animation sequence for explosion effect
                Animated.sequence([
                    Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
                    Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true })
                ]).start();
            }

            // Fade in and scale up animation
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 8,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            // Reset animations when hidden
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.5);
        }
    }, [visible, type]);

    if (!visible) return null;

    const isWin = type === 'win';
    
    return (
        <View style={styles.overlay}>
            <Animated.View 
                style={[
                    styles.container, 
                    isWin ? styles.winContainer : styles.loseContainer,
                    {
                        opacity: fadeAnim,
                        transform: [
                            { scale: scaleAnim },
                            { translateX: shakeAnim }
                        ]
                    }
                ]}
            >
                <View style={styles.iconContainer}>
                    <FontAwesome5 
                        name={isWin ? "flag" : "bomb"} 
                        size={50} 
                        color={isWin ? "#FFD700" : "#FF3B30"} 
                    />
                </View>
                
                <Text style={styles.title}>
                    {isWin ? "VICTORY!" : "GAME OVER!"}
                </Text>
                
                <Text style={styles.message}>
                    {isWin 
                        ? "You've successfully cleared the minefield!" 
                        : "You've triggered a mine and lost the game!"}
                </Text>
                
                <Pressable 
                    style={[styles.button, isWin ? styles.winButton : styles.loseButton]} 
                    onPress={onClose}
                    android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
                >
                    <Text style={styles.buttonText}>PLAY AGAIN</Text>
                </Pressable>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    container: {
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 15,
        elevation: 20,
    },
    winContainer: {
        borderWidth: 2,
        borderColor: '#FFD700',
    },
    loseContainer: {
        borderWidth: 2,
        borderColor: '#FF3B30',
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a2639',
        marginBottom: 10,
        letterSpacing: 2,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        marginBottom: 24,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        marginTop: 8,
    },
    winButton: {
        backgroundColor: '#4CD964',
    },
    loseButton: {
        backgroundColor: '#FF3B30',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});

export default GameAlert;