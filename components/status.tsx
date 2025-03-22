import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useFonts } from "expo-font";

interface GameStatusProps {
    flag: number;
    time: number;
    mode: string;
    mine: number;
    resetGame: () => void;
}

const GameStatus = ({ flag, time, mode, mine, resetGame }: GameStatusProps) => {
    const [fontsLoaded] = useFonts({
        "DIGI": require("../assets/fonts/digital-7.regular.ttf"), // เปลี่ยนชื่อไฟล์ให้ตรงกับที่ใช้งาน
    });

    return (
        <View style={{flexDirection : 'row' , padding : 10 , justifyContent : 'space-between'}}>
            <View>
            </View>
            <View style={{gap: 10}}>
                <View style={{flexDirection : 'row',justifyContent : 'center',alignItems :'center', gap: 20}}>
                    <FontAwesome name="bomb" size={24}/>
                    <Text style={{textAlign:'center' , fontFamily:'DIGI' , fontSize: 24}}>
                        {mine}
                    </Text>
                    <FontAwesome name="flag" size={24} />
                    <Text style={{textAlign:'center' , fontFamily:'DIGI' , fontSize: 24}}>
                        {flag}
                    </Text>
                    <FontAwesome name="clock-o" size={24}/>
                    <Text style={{textAlign:'center' , fontFamily:'DIGI' , fontSize: 24}}>
                        {time} s
                    </Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={resetGame}>
                    <FontAwesome name="rotate-left" size={24}/>
                </TouchableOpacity>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e0e5e5",
        flexDirection: 'row',
    },
    inputBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#99a3a3",
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: 180,
        height: 70,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        margin: 20,
        elevation: 8
    },
    icon: {
        marginRight: 10,
    },
    input: {
        fontSize: 40,
        fontFamily: "DIGI",
        color: "white",
        textAlign: "center",
        flex: 1,
    },
});

export default GameStatus;