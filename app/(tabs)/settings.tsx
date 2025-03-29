import { useAppState } from '../../store/StateContext';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Animated, Dimensions, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef } from 'react';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function Settings() {
  const { ROWS, setROWS, COLS, setCOLS, MINES, setMINES, FLAGS, setFLAGS, MODE, setMODE } = useAppState();
  const { width, height } = Dimensions.get('window');
  
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const easyMode = () => {
    setMODE("EASY");
    setROWS(8);
    setCOLS(8);
    setMINES(10);
    setFLAGS(10);
    animateModeChange();
  }

  const mediumMode = () => {
    setMODE("MEDIUM");
    setROWS(12);
    setCOLS(12);
    setMINES(20);
    setFLAGS(20);
    animateModeChange();
  }

  const hardMode = () => {
    setMODE("HARD");
    setROWS(16);
    setCOLS(16);
    setMINES(40);
    setFLAGS(40);
    animateModeChange();
  }

  const animateModeChange = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a2639" />

        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleTop}>SETTINGS</Text>
          </View>
          <View style={styles.subtitle}>
            <Ionicons name="settings-sharp" size={18} color="#D0E1F9" />
            <Text style={styles.subtitleText}>CUSTOMIZE YOUR GAME</Text>
          </View>
        </View>

        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <View style={styles.modeContainer}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="gamepad" size={20} color="#D0E1F9" />
              <Text style={styles.sectionTitle}>GAME MODE</Text>
            </View>

            <View style={styles.buttonRow}>
              <Pressable 
                style={[
                  styles.modeButton, 
                  styles.easyButton,
                  MODE === "EASY" && styles.activeButton
                ]} 
                onPress={easyMode}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.modeButtonText}>EASY</Text>
                  <View style={styles.modeDetails}>
                    <Text style={styles.modeDetailText}>8×8</Text>
                    <Text style={styles.modeDetailText}>10 mines</Text>
                  </View>
                  {MODE === "EASY" && <Ionicons name="checkmark-circle" size={24} color="white" style={styles.checkmark} />}
                </View>
              </Pressable>

              <Pressable 
                style={[
                  styles.modeButton, 
                  styles.mediumButton,
                  MODE === "MEDIUM" && styles.activeButton
                ]} 
                onPress={mediumMode}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.modeButtonText}>MEDIUM</Text>
                  <View style={styles.modeDetails}>
                    <Text style={styles.modeDetailText}>12×12</Text>
                    <Text style={styles.modeDetailText}>20 mines</Text>
                  </View>
                  {MODE === "MEDIUM" && <Ionicons name="checkmark-circle" size={24} color="white" style={styles.checkmark} />}
                </View>
              </Pressable>

              <Pressable 
                style={[
                  styles.modeButton, 
                  styles.hardButton,
                  MODE === "HARD" && styles.activeButton
                ]} 
                onPress={hardMode}
                android_ripple={{ color: 'rgba(255, 255, 255, 0.2)', borderless: false }}
              >
                <View style={styles.buttonContent}>
                  <Text style={styles.modeButtonText}>HARD</Text>
                  <View style={styles.modeDetails}>
                    <Text style={styles.modeDetailText}>16×16</Text>
                    <Text style={styles.modeDetailText}>40 mines</Text>
                  </View>
                  {MODE === "HARD" && <Ionicons name="checkmark-circle" size={24} color="white" style={styles.checkmark} />}
                </View>
              </Pressable>
            </View>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.sectionHeader}>
              <FontAwesome5 name="info-circle" size={20} color="#D0E1F9" />
              <Text style={styles.sectionTitle}>CURRENT SETTINGS</Text>
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>BOARD SIZE</Text>
                <Text style={styles.statValue}>{ROWS}×{COLS}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>MINES</Text>
                <Text style={styles.statValue}>{MINES}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>FLAGS</Text>
                <Text style={styles.statValue}>{FLAGS}</Text>
              </View>
              
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>DIFFICULTY</Text>
                <Text style={[
                  styles.statValue, 
                  MODE === "EASY" ? styles.easyText : 
                  MODE === "MEDIUM" ? styles.mediumText : 
                  styles.hardText
                ]}>{MODE}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Swipe to return to game</Text>
          <Ionicons name="chevron-back" size={16} color="#D0E1F9" />
        </View>
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
  contentContainer: {
    flex: 1,
    paddingTop: 30,
  },
  modeContainer: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#D0E1F9',
    marginLeft: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15,
  },
  modeButton: {
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  easyButton: {
    backgroundColor: '#4CAF50',
  },
  mediumButton: {
    backgroundColor: '#2196F3',
  },
  hardButton: {
    backgroundColor: '#F44336',
  },
  activeButton: {
    borderWidth: 2,
    borderColor: 'white',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  modeDetails: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  modeDetailText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  checkmark: {
    position: 'absolute',
    left: -5,
    top: -5,
  },
  statsContainer: {
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  statItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  statLabel: {
    color: '#D0E1F9',
    fontSize: 14,
    marginBottom: 5,
    opacity: 0.8,
  },
  statValue: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  easyText: {
    color: '#4CAF50',
  },
  mediumText: {
    color: '#2196F3',
  },
  hardText: {
    color: '#F44336',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    color: '#D0E1F9',
    fontSize: 14,
    opacity: 0.6,
    marginRight: 5,
  },
});