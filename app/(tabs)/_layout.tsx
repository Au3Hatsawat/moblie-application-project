import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StateProvider } from "@/store/StateContext";

export default function TabLayout() {
    return (
        <StateProvider>
            <Tabs screenOptions={{ 
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#e0e5e5',
                tabBarStyle: {backgroundColor: '#99a3a3'}
                }}>
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                        headerShown : false
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        title: 'Settings',
                        tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
                        headerShown : false
                    }}
                />
            </Tabs>
        </StateProvider>
    )
}