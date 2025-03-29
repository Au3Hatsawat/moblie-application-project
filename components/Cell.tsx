import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Text, StyleSheet, View, Animated } from "react-native";

interface CellProps {
  data: {
    isMine: boolean;
    revealed: boolean;
    neighborMines: number;
    flagged: boolean;
  };
  onPress: () => void;
  onLongPress: () => void;
  row: number;
  col: number;
  MAX_ROW: number;
  MAX_COL: number;
  blockSize: number;
}

export default function Cell({ data, onPress, onLongPress, row, col, MAX_ROW, MAX_COL, blockSize }: CellProps) {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Animation when cell is revealed
  useEffect(() => {
    if (data.revealed) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 80,
        useNativeDriver: true,
      }).start();
      
      // Add extra bomb explosion/shake animation
      if (data.isMine) {
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 0.1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -0.1,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0.05,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -0.05,
            duration: 50,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }
  }, [data.revealed]);

  const getColor = (number: number) => {
    switch (number) {
      case 1: return "#4285F4"; // Blue
      case 2: return "#0F9D58"; // Green
      case 3: return "#DB4437"; // Red
      case 4: return "#4B0082"; // Indigo
      case 5: return "#8B0000"; // Dark Red
      case 6: return "#008B8B"; // Teal
      case 7: return "#000000"; // Black
      case 8: return "#808080"; // Gray
      default: return "#000000";
    }
  };

  // Calculate if cell is in any corner for enhanced styling
  const isTopLeft = row === 0 && col === 0;
  const isTopRight = row === 0 && col === MAX_COL - 1;
  const isBottomLeft = row === MAX_ROW - 1 && col === 0;
  const isBottomRight = row === MAX_ROW - 1 && col === MAX_COL - 1;
  
  // Calculate if cell is on any edge
  const isTopEdge = row === 0 && !isTopLeft && !isTopRight;
  const isRightEdge = col === MAX_COL - 1 && !isTopRight && !isBottomRight;
  const isBottomEdge = row === MAX_ROW - 1 && !isBottomLeft && !isBottomRight;
  const isLeftEdge = col === 0 && !isTopLeft && !isBottomLeft;

  // Create dynamic border radius based on position
  const getBorderRadius = () => {
    if (isTopLeft) return { borderTopLeftRadius: 10 };
    if (isTopRight) return { borderTopRightRadius: 10 };
    if (isBottomLeft) return { borderBottomLeftRadius: 10 };
    if (isBottomRight) return { borderBottomRightRadius: 10 };
    return {};
  };

  // Create rotation string for mine animation
  const rotate = rotateAnim.interpolate({
    inputRange: [-0.1, 0.1],
    outputRange: ['-10deg', '10deg']
  });

  return (
    <Animated.View style={{
      transform: [
        { scale: scaleAnim },
        { rotate: data.isMine && data.revealed ? rotate : '0deg' }
      ]
    }}>
      <TouchableOpacity
        style={[
          {
            width: blockSize,
            height: blockSize
          },
          styles.cell,
          (col + row) % 2 === 0 ? styles.light : styles.heavy,
          data.revealed && styles.revealed,
          getBorderRadius(),
          data.revealed && data.isMine ? styles.bombBackground : "",
          // Add inner shadow effect when revealed
          data.revealed && styles.revealedShadow
        ]}
        onPress={data.flagged ? () => { } : onPress}
        onLongPress={onLongPress}
        activeOpacity={0.7}
      >
        {data.revealed ? (
          <Text style={{ 
            fontSize: blockSize * 0.6, 
            fontWeight: "bold", 
            color: getColor(data.neighborMines),
            // Add text shadow to numbers for better visibility
            textShadowColor: 'rgba(0,0,0,0.2)',
            textShadowOffset: {width: 1, height: 1},
            textShadowRadius: 1
          }}>
            {data.isMine ? "💥" : data.neighborMines > 0 ? data.neighborMines : ""}
          </Text>
        ) : (
          <>
            {data.flagged ? (
              <Text style={{ fontSize: blockSize * 0.6, fontWeight: "bold" }}>🚩</Text>
            ) : (
              // Add subtle pattern/texture to unrevealed cells
              <View style={styles.cellPattern} />
            )}
          </>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  cell: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    elevation: 5,
    margin: 1, // Add small gap between cells
  },
  revealed: {
    backgroundColor: "#e0e5e5",
  },
  revealedShadow: {
    // Inner shadow effect for revealed cells
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  heavy: {
    backgroundColor: "#3D5A80",
  },
  light: {
    backgroundColor: "#507DBC",
  },
  bombBackground: {
    backgroundColor: "#FF3B30",
  },
  cellPattern: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 5,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  }
});