import { View, Text} from 'react-native';
import React, {useState, useEffect} from "react";
import BoxComponent from "../components/BoxComponent";
import BoxModComponent from "../components/BoxModComponent";
import st from "../utils/styles";

const index = () => {
  const [time,setTime]=useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const formatTime=(time)=>{
    const hrs=(time.getHours()%12).toString().padStart(2,"0");
    const mins=time.getMinutes().toString().padStart(2,"0");
    const secs=time.getSeconds().toString().padStart(2,"0");
    return `${hrs}:${mins}:${secs}`;
  }
  const formatAmPm=(time)=>{
    if(time.getHours()>=12){
      return "PM";
    }
    return "AM";
  }

  const welcomeUser=()=>{
    const now=new Date();
    const hours=now.getHours();
    if(hours>=4 && hours<12){
      return "Good Morning 🌅"
    }else if(hours>=12 && hours<14){
      return "Good Noon ☀️"
    }else if(hours>=14 && hours<17){
      return "Good Afternoon 🌇"
    }else{
      return "Good Evening ☕"
    }
  }
  return (
    <View style={st.bgContainer}>
      <Text style={st.heading}>{welcomeUser()}</Text>
      <BoxModComponent url="clock" smallTxt={formatAmPm(time)} text={formatTime(time)} width="85%" height="20%"  fontSize="35" fontWeight="bold"/>
      <View style={st.contentSmall}>
        <BoxComponent url="timer" text="Timer" width="40%" fontSize="30" fontWeight="bold"  imageSource={require("../assets/images/timer.png")} imageWidth="40" imageHeight="40"/>
        <BoxComponent url="stopwatch" text="Stopwatch" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/stopwatch.png")} imageWidth="40" imageHeight="40"/>
      </View>
      <View style={st.contentSmall}>
        <BoxComponent url="pomodoro" text="Pomodoro" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/tomato.png")} imageWidth="40" imageHeight="40"/>
        <BoxModComponent smallTxt="(Coming Soon)" url="index" text="Settings" width="40%" fontSize="30" fontWeight="bold" imageSource={require("../assets/images/settings.png")} imageWidth="40" imageHeight="40"/>
      </View>
  
    </View>
  )
}

export default index;