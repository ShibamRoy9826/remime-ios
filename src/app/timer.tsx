import { View,StyleSheet, Text, TextInput } from 'react-native';
import React,{useState,useRef} from 'react';
import BoxModComponent from "../components/BoxModComponent";
import ButtonComponent from "../components/ButtonComponent";
import NumberInput from "../components/NumberInput";
import {Audio} from 'expo-av';
import st from "../utils/styles";

const TimerScreen = () => {
   const [isRunning, setIsRunning] = useState(false);
    const [time,setTime] = useState(0);
    const [targetTime,setTargetTime] = useState(10);
    const [sound,setSound] = useState(null);
    const [isEditable, setIsEditable] = useState(true);
    const [text,setText] = useState("");
    const [hrs,setHrs] = useState(0);
    const [mins,setMins] = useState(0);
    const [secs,setSecs] = useState(0);
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
      const hrs1 = Math.floor(tgt/3600).toString().padStart(2,'0');
      const mins1 = Math.floor((tgt%3600)/60).toString().padStart(2,'0');
      const secs1 = (tgt%60).toString().padStart(2,'0');
      return `${hrs1}:${mins1}:${secs1}`
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

    const updateTargetTime = (h,m,s) =>{ 
      h=Number(h);
      m=Number(m);
      s=Number(s);

      if(m>=60){
        m=59;
      }
      if(s>=60){
        s=59;
      }
      setHrs(h);
      setMins(m);
      setSecs(s);
      // console.log(h);
      // console.log(m);
      // console.log(s);
      const totalTime=h*3600+m*60+s;
      // console.log("Target Time: ",totalTime," Hours: ",h*3600,"Mins: ",m*60,"Seconds:",s);

      if(totalTime!=0){
        setTargetTime(totalTime);
      }
      else{
        setTargetTime(10);
      }
      
    }

    // Reset 
    const reset=()=>{
      clearInterval(interval.current);
      setTime(0);
      setIsRunning(false);
      setText("");

    }

    // Other button functions
    
  return (
    <View style={st.bgContainer}>
      <TextInput style={st.textInput} value={text} editable={isEditable} onChangeText={(newText) => setText(newText)} placeholder="What is this timer for?"></TextInput>
     <BoxModComponent url="timer" smallTxt={formatTarget(targetTime)} text={format(time)} width="85%" height="20%"  fontSize="35" fontWeight="bold"/>
     <View style={styles.container}>
       <ButtonComponent imageSource={isRunning ? require("../assets/images/pause.png"): require("../assets/images/start.png")} imageWidth="30" imageHeight="30" onpress={toggleWatch} text={isRunning? "Pause" : "Start"} width="28%" height="60%" fontSize="30" fontWeight="bold"/>

       <ButtonComponent imageSource={require("../assets/images/reset.png")} imageWidth="30" imageHeight="30" onpress={reset} text="Reset" width="28%" height="60%"  fontSize="30" fontWeight="bold"/>
       </View>
       <View style={styles.container}>
       <NumberInput value={hrs} onchange={(h) => updateTargetTime(h,mins,secs)
       } />
       <Text style={{color:"white"}}>Hours</Text>

       <NumberInput value={mins} onchange={(m) => updateTargetTime(hrs,m,secs)} />
       <Text style={{color:"white"}}>Minutes</Text>

       <NumberInput value={secs} onchange={(s) => updateTargetTime(hrs,mins,s)} />
       <Text style={{color:"white"}}>Seconds</Text>


       </View>
       
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
  },
  textInput:{
    color: "#cdd6f4",
    fontSize: 25,
    fontWeight:"bold",
    backgroundColor:"#1e1e2e",
    width:"10%",
    height:"35%",
    margin:20,
    borderRadius: 10,
    borderWidth:2,
    borderColor: "#45475a",
    textAlign:"center"
}
})
export default TimerScreen;
