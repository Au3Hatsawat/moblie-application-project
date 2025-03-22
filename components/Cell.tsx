import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

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
  const getColor = (number: number) => {
    switch (number) {
      case 1: return "rgb(0, 0, 255)";
      case 2: return "rgb(0, 128, 0)";
      case 3: return "rgb(255, 0, 0)";
      case 4: return "rgb(128, 0, 128)";
      case 5: return "rgb(139, 0, 0)";
      case 6: return "rgb(32, 178, 170)";
      case 7: return "rgb(0, 0, 0)";
      case 8: return "rgb(128, 128, 128)";
      default: return "rgb(0, 0, 0)";
    }
  };



  return (
    <TouchableOpacity
      style={[
        {
          width: blockSize - 10,
          height: blockSize - 10
        },
        styles.cell,
        (col + row) % 2 == 0 ? styles.light : styles.heavy,
        data.revealed && styles.revealed,
        row == 0 && col == 0 ? styles.topLeft : "",
        row == 0 && col == MAX_COL - 1 ? styles.topRight : "",
        row == MAX_ROW - 1 && col == 0 ? styles.bottomLeft : "",
        row == MAX_ROW - 1 && col == MAX_COL - 1 ? styles.bottomRight : "",
        data.revealed && data.isMine ? styles.bombBackground : ""
      ]}
      onPress={data.flagged ? () => { } : onPress}
      onLongPress={onLongPress}
    >
      {data.revealed ? (
        <Text style={{
          fontSize: blockSize - 20, fontWeight: "bold", color: getColor(data.neighborMines), textShadowColor: getColor(data.neighborMines), 
          textShadowOffset: { width: 0, height: 0 },
          textShadowRadius: 5,
        }}>
          {data.isMine ? <FontAwesome name="bomb" size={blockSize - 20} color={"white"} /> : data.neighborMines > 0 ? data.neighborMines : ""}
        </Text>
      ) : (
        <Text style={{ fontSize: blockSize - 20, fontWeight: "bold" }}>{data.flagged ? <FontAwesome name="flag" size={blockSize - 20} color={"red"}/>: ""}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    // width: 40,
    // height: 40,
    // borderWidth: 0.5,
    // borderColor: "#999",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    elevation: 5,
    margin: 2,
    borderRadius: 10
  },
  revealed: {
    backgroundColor: "#e0e5e5",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
  },
  heavy: {
    backgroundColor: "#99a3a3",
  },
  light: {
    backgroundColor: "#99a3a3",
  },
  topLeft: {
    borderTopLeftRadius: 10,
  },
  topRight: {
    borderTopRightRadius: 10,
  },
  bottomLeft: {
    borderBottomLeftRadius: 10,
  },
  bottomRight: {
    borderBottomRightRadius: 10,
  },
  bombBackground: {
    backgroundColor: "#EF5A6F",
  },



});
