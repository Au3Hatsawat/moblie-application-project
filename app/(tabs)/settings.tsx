import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAppState } from '../../store/StateContext';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';

export default function Settings() {
  const { ROWS, setROWS, COLS, setCOLS, MINES, setMINES, FLAGS, setFLAGS, MODE, setMODE } = useAppState();

  const [count , setCount] = useState(1);

  const checkMode = () => {
    if(count === 1) {
      easyMode();
    }else if(count === 2){
      mediumMode();
    }else if(count === 3){
      hardMode();
    }else if(count < 1){
      setCount(1);
    }else if(count > 3){
      setCount(3);
    }
  }

  useEffect(()=>{
    checkMode();
  },[count])

  const easyMode = () => {
    setMODE("EASY");
    setROWS(8);
    setCOLS(8);
    setMINES(10);
    setFLAGS(10);
  }

  const mediumMode = () => {
    setMODE("MEDIUM");
    setROWS(12);
    setCOLS(8);
    setMINES(20);
    setFLAGS(20);
  }

  const hardMode = () => {
    setMODE("HARD");
    setROWS(16);
    setCOLS(8);
    setMINES(40);
    setFLAGS(40);
  }


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#e0e5e5" />

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 35, fontWeight: "bold", textAlign: 'center', letterSpacing: 5, color: '#99a3a3', paddingVertical: 20 }}>
            SETTING
          </Text>
        </View>

        <View>
          <View style={{gap:15}}>
            <Text style={{fontSize: 25, color: '#a8b0b2', fontWeight: 'semibold', textAlign:'center'}}>
              GAME MODE
            </Text>
            <View style={{flexDirection:'row' , justifyContent: 'space-around'}}>
              <TouchableOpacity onPress={() => setCount((prev) => prev-1)}>
                <FontAwesome name='chevron-left' size={24} style={{textAlign: 'center'}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 24 , textAlign: 'center' , color:'#99a3a3'}}>{MODE}</Text>
              <TouchableOpacity onPress={() => setCount((prev) => prev+1)}>
                <FontAwesome name='chevron-right' size={24} style={{textAlign: 'center'}}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>


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
