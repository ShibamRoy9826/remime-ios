import { View,StyleSheet, TextInput } from 'react-native';
import React,{useState,useRef} from 'react';
import BoxModComponent from "../components/BoxModComponent";
import ButtonComponent from "../components/ButtonComponent";
import {Audio} from 'expo-av';
import st from "../utils/styles";

const PomodoroScreen = () => {
   const [isRunning, setIsRunning] = useState(false);
    const [time,setTime] = useState(0);
    const [targetTime,setTargetTime] = useState(25*60);
    const [sound,setSound] = useState(null);
    const [isEditable, setIsEditable] = useState(true);
    const [text,setText] = useState("");
    const interval=useRef(null);

    

    // For playing/muting the sound

    const ring= async() => {
      const {sound} = await Audio.Sound.createAsync(
        require('../assets/audio/ring.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    };
    const mute = async()=>{
      if (sound){
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    }
    React.useEffect(()=>{
      return sound
      ? () => {
        sound.unloadAsync();
      }
      :undefined;
    },[sound]);

    // Stop/Start timer
  
    const toggleWatch=()=>{
      if(isRunning){
        clearInterval(interval.current);
      }else{
        const startTime=Date.now()- time;
        interval.current = setInterval(()=>{
          setTime(Date.now() - startTime);
        },100);
      }
      setIsRunning(!isRunning);
    };

    // update time to screen
    const formatTarget=(tgt:Number)=>{
      const mins = Math.floor(tgt/60).toString().padStart(2,'0');
      const secs = (tgt%60).toString().padStart(2,'0');
      return `${mins}:${secs}`
    }
    const format= (time) =>{
      const hours=Math.floor(time/3600000).toString().padStart(2,'0');
      const mins=Math.floor(time/60000).toString().padStart(2,'0');
      const secs=Math.floor((time%60000)/1000).toString().padStart(2,'0');
      const milsecs=Math.floor((time%1000)/10).toString().padStart(2,'0');

      if (Number(secs)==targetTime){
        ring();
        reset();

      }
      return `${hours}:${mins}:${secs}.${milsecs}`;
    }

    // Reset 
    const reset=()=>{
      clearInterval(interval.current);
      setTime(0);
      setIsRunning(false);
      setText("");

    }

    // Other button functions
    const pomo=()=>{
      reset();
      setTargetTime(25*60);
      setIsEditable(true);
    }
    const shortBreak=()=>{
      reset();
      setTargetTime(5*60);
      clearInterval(interval.current);
      setIsEditable(false);
     
    }
    const longBreak=()=>{
      reset();
      setTargetTime(20*60);
      clearInterval(interval.current);
      setIsEditable(false);
    }
    
  return (
    <View style={st.bgContainer}>
      <TextInput style={st.textInput} value={text} editable={isEditable} onChangeText={(newText) => setText(newText)} placeholder="What do you plan to do this time?"></TextInput>
     <BoxModComponent url="pomodoro" smallTxt={formatTarget(targetTime)} text={format(time)} width="85%" height="20%"  fontSize="35" fontWeight="bold"/>
     <View style={styles.container}>
       <ButtonComponent imageSource={isRunning ? require("../assets/images/pause.png"): require("../assets/images/start.png")} imageWidth="30" imageHeight="30" onpress={toggleWatch} text={isRunning? "Pause" : "Start"} width="28%" height="60%" fontSize="30" fontWeight="bold"/>

       <ButtonComponent imageSource={require("../assets/images/reset.png")} imageWidth="30" imageHeight="30" onpress={reset} text="Reset" width="28%" height="60%"  fontSize="30" fontWeight="bold"/>
       </View>
       <View style={styles.container}>
       <ButtonComponent imageSource={require("../assets/images/tomato.png")} imageWidth="30" imageHeight="30" onpress={pomo} text="Pomodoro" width="28%" height="60%"  fontSize="30" fontWeight="bold"/>

      <ButtonComponent imageSource={require("../assets/images/coffee.png")} imageWidth="30" imageHeight="30" text="Break" width="28%" height="60%" onpress={shortBreak}  fontSize="30" fontWeight="bold"/>
      </View>
      <ButtonComponent imageSource={require("../assets/images/coffee.png")} imageWidth="30" imageHeight="30" text="Long Break" width="28%" height="15%" onpress={longBreak}  fontSize="30" fontWeight="bold"/>
    </View>
  )
}

const styles= StyleSheet.create({
  container:{
    flexDirection:"row",
    height:"18%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
    padding:0
  }
})
export default PomodoroScreen;
