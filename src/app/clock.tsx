import { View, Text } from 'react-native'
import React, {useState, useEffect} from "react";
import BoxModComponent from "../components/BoxModComponent";
import st from "../utils/styles";

const ClockScreen = () => {
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
      const formatDate=(time)=>{
        const dayName=time.toLocaleString('default',{weekday:'long'});
        const monthName=time.toLocaleString('default',{month:"short"});
        const day=time.getDate();
        const year=time.getFullYear();
        return `${dayName}, ${monthName}, ${day}, ${year}`;

      }
      const formatAmPm=(time)=>{
        if(time.getHours()>=12){
          return "PM";
        }
        return "AM";
      }
    //   Quotes
      const quotes=[
        "“The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.” — Winston Churchill",
        
        "“Don’t let yesterday take up too much of today.” — Will Rogers",

        "“Either you run the day or the day runs you.” — Jim Rohn",

        "“Keep your eyes on the stars, and your feet on the ground.” ― Theodore Roosevelt",

        "“Get a good idea and stay with it. Dog it, and work at it until it’s done right.” — Walt Disney",

        "“Work until your bank account looks like a phone number.” — Unknown"
    ];
      const [quote,setQuote] = useState("");
      useEffect(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
      }, []);
      
  return (
    <View style={st.bgContainer}>
        <Text style={[st.textNormal,{margin:20}]}>{quote}</Text>
      <BoxModComponent url="clock" smallTxt={formatAmPm(time)} text={formatTime(time)} width="85%" height="40%"  fontSize="100" fontWeight="bold"/>
      <Text style={st.textNormal}>{formatDate(time)}</Text>
    </View>
  )
}

export default ClockScreen