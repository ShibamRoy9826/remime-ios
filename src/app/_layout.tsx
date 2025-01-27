import {Stack} from "expo-router";
import {StyleSheet} from "react-native";
const RootLayout=()=>{
    return(
        <Stack screenOptions={
            {
                headerStyle:{
                    backgroundColor:"#1e1e2e",
                },
                headerTintColor:"#cdd6f4"

            }
        }>
            <Stack.Screen name="index" options={{headerTitle:"Remime!"}}/>
            <Stack.Screen name="pomodoro" options={{headerTitle:"Pomodoro"}}/>
            <Stack.Screen name="timer" options={{headerTitle:"Timer"}}/>
            <Stack.Screen name="stopwatch" options={{headerTitle:"Stopwatch"}}/>
            <Stack.Screen name="settings" options={{headerTitle:"Settings"}}/>
        </Stack>
    );
}
const styles=StyleSheet.create({
    headerStyle:{
        backgroundColor:"#1e1e2e",
        color:"#cdd6f4"
    }
})
export default RootLayout;